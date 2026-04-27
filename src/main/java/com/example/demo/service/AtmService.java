package com.example.demo.service;

import com.example.demo.dto.AtmDetails;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.TransactionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AtmService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private String getBankTable(String atmId) {
        if (atmId == null) return null;
        atmId = atmId.toLowerCase();
        if (atmId.contains("iob")) return "iob";
        if (atmId.contains("icic")) return "icic";
        if (atmId.contains("cnrb")) return "cnrb";
        if (atmId.contains("sbi")) return "sbi";
        return null;
    }

    public boolean validateAtmId(String atmId) {
        String table = getBankTable(atmId);
        if (table == null) return false;
        
        String sql = "SELECT count(*) FROM " + table + " WHERE atm_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, atmId);
        return count != null && count > 0;
    }

    public List<AtmDetails> searchAtms(String location, int bankChoice) {
        String table = switch (bankChoice) {
            case 1 -> "iob";
            case 2 -> "icic";
            case 3 -> "cnrb";
            case 4 -> "sbi";
            default -> null;
        };
        if (table == null) return List.of();

        String sql = "SELECT atm_id, branch_name, area, city FROM " + table + " WHERE area LIKE ? OR city LIKE ? ORDER BY area ASC";
        String searchParam = "%" + location + "%";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            AtmDetails details = new AtmDetails();
            details.setAtmId(rs.getString("atm_id"));
            details.setBranchName(rs.getString("branch_name"));
            details.setArea(rs.getString("area"));
            details.setCity(rs.getString("city"));
            return details;
        }, searchParam, searchParam);
    }

    public String validateLogin(LoginRequest request) {
        String sql = "SELECT name, password FROM account_holder WHERE c_id = ?";
        try {
            Map<String, Object> account = jdbcTemplate.queryForMap(sql, request.getCustomerId());
            String dbPassword = (String) account.get("password");
            if (dbPassword != null && dbPassword.equals(request.getPin())) {
                return (String) account.get("name");
            }
        } catch (Exception e) {
            // Customer not found or other errors
        }
        return null;
    }

    public Double getBalance(int customerId) {
        String sql = "SELECT balance FROM account_holder WHERE c_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, Double.class, customerId);
        } catch (Exception e) {
            return null;
        }
    }

    public String withdraw(TransactionRequest request) {
        String table = getBankTable(request.getAtmId());
        if (table == null) return "Invalid ATM ID";

        if (request.getAmount() <= 0 || request.getAmount() % 100 != 0) {
            return "Invalid amount. Only 100, 200, 500 notes available.";
        }

        Double currentBalance = getBalance(request.getCustomerId());
        if (currentBalance == null) return "Customer not found.";
        if (currentBalance < request.getAmount()) return "Insufficient account balance.";

        String atmSql = "SELECT avl_balance FROM " + table + " WHERE atm_id = ?";
        Double atmBalance;
        try {
            atmBalance = jdbcTemplate.queryForObject(atmSql, Double.class, request.getAtmId());
        } catch (Exception e) {
            return "ATM not found.";
        }

        if (atmBalance == null || atmBalance < request.getAmount()) {
            return "Temporarily unable to dispense requested amount. Please try a lower amount.";
        }

        // Update balances
        jdbcTemplate.update("UPDATE account_holder SET balance = balance - ? WHERE c_id = ?", request.getAmount(), request.getCustomerId());
        jdbcTemplate.update("UPDATE " + table + " SET avl_balance = avl_balance - ? WHERE atm_id = ?", request.getAmount(), request.getAtmId());

        return "Success";
    }

    public String deposit(TransactionRequest request) {
        String table = getBankTable(request.getAtmId());
        if (table == null) return "Invalid ATM ID";

        if (request.getAmount() <= 0 || request.getAmount() % 100 != 0) {
            return "Invalid amount. Only 100, 200, 500 notes available.";
        }

        Double currentBalance = getBalance(request.getCustomerId());
        if (currentBalance == null) return "Customer not found.";

        // Update balances
        jdbcTemplate.update("UPDATE account_holder SET balance = balance + ? WHERE c_id = ?", request.getAmount(), request.getCustomerId());
        jdbcTemplate.update("UPDATE " + table + " SET avl_balance = avl_balance + ? WHERE atm_id = ?", request.getAmount(), request.getAtmId());

        return "Success";
    }

    public AtmDetails getAtmReserveStatus(String atmId) {
        String table = getBankTable(atmId);
        if (table == null) return null;

        String sql = "SELECT atm_id, branch_name, area, city, avl_balance FROM " + table + " WHERE atm_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                AtmDetails details = new AtmDetails();
                details.setAtmId(rs.getString("atm_id"));
                details.setBranchName(rs.getString("branch_name"));
                details.setArea(rs.getString("area"));
                details.setCity(rs.getString("city"));
                
                double balance = rs.getDouble("avl_balance");
                if (balance > 100000) {
                    details.setReserveStatus("100000+");
                } else {
                    details.setReserveStatus(String.format("%.2f", balance));
                }
                return details;
            }, atmId);
        } catch (Exception e) {
            return null;
        }
    }
}

