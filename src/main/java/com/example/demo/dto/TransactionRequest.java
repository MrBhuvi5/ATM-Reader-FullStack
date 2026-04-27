package com.example.demo.dto;

public class TransactionRequest {
    private String atmId;
    private int customerId;
    private double amount;

    // Getters and Setters
    public String getAtmId() { return atmId; }
    public void setAtmId(String atmId) { this.atmId = atmId; }
    public int getCustomerId() { return customerId; }
    public void setCustomerId(int customerId) { this.customerId = customerId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}
