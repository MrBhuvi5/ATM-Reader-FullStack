package com.example.demo.dto;

public class LoginRequest {
    private String atmId;
    private int customerId;
    private String pin;

    // Getters and Setters
    public String getAtmId() { return atmId; }
    public void setAtmId(String atmId) { this.atmId = atmId; }
    public int getCustomerId() { return customerId; }
    public void setCustomerId(int customerId) { this.customerId = customerId; }
    public String getPin() { return pin; }
    public void setPin(String pin) { this.pin = pin; }
}
