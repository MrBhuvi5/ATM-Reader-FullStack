package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.AtmDetails;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.TransactionRequest;
import com.example.demo.service.AtmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For development flexibility
public class AtmController {

    @Autowired
    private AtmService atmService;

    @GetMapping("/atm/validate")
    public ApiResponse<Boolean> validateAtm(@RequestParam String atmId) {
        boolean isValid = atmService.validateAtmId(atmId);
        if (isValid) {
            return ApiResponse.success("Valid ATM ID", true);
        } else {
            return ApiResponse.error("Invalid ATM ID");
        }
    }

    @GetMapping("/atm/search")
    public ApiResponse<List<AtmDetails>> searchAtms(@RequestParam String location, @RequestParam int bankChoice) {
        List<AtmDetails> atms = atmService.searchAtms(location, bankChoice);
        if (atms.isEmpty()) {
            return ApiResponse.error("No ATM Available at that location!");
        }
        return ApiResponse.success("ATMs found", atms);
    }

    @GetMapping("/atm/reserve")
    public ApiResponse<AtmDetails> getReserveStatus(@RequestParam String atmId) {
        AtmDetails details = atmService.getAtmReserveStatus(atmId);
        if (details != null) {
            return ApiResponse.success("Reserve fetched", details);
        } else {
            return ApiResponse.error("Invalid ATM ID");
        }
    }

    @PostMapping("/auth/login")
    public ApiResponse<String> login(@RequestBody LoginRequest request) {
        String name = atmService.validateLogin(request);
        if (name != null) {
            return ApiResponse.success("Login successful", name);
        } else {
            return ApiResponse.error("Invalid Customer ID or PIN");
        }
    }

    @GetMapping("/account/balance")
    public ApiResponse<Double> getBalance(@RequestParam int customerId) {
        Double balance = atmService.getBalance(customerId);
        if (balance != null) {
            return ApiResponse.success("Balance retrieved", balance);
        } else {
            return ApiResponse.error("Failed to retrieve balance");
        }
    }

    @PostMapping("/transaction/withdraw")
    public ApiResponse<Double> withdraw(@RequestBody TransactionRequest request) {
        String result = atmService.withdraw(request);
        if ("Success".equals(result)) {
            return ApiResponse.success("Cash withdrawn successfully", atmService.getBalance(request.getCustomerId()));
        } else {
            return ApiResponse.error(result);
        }
    }

    @PostMapping("/transaction/deposit")
    public ApiResponse<Double> deposit(@RequestBody TransactionRequest request) {
        String result = atmService.deposit(request);
        if ("Success".equals(result)) {
            return ApiResponse.success("Cash deposited successfully", atmService.getBalance(request.getCustomerId()));
        } else {
            return ApiResponse.error(result);
        }
    }
}
