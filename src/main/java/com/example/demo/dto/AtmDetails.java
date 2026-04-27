package com.example.demo.dto;

public class AtmDetails {
    private String atmId;
    private String branchName;
    private String area;
    private String city;
    private String reserveStatus;

    // Getters and Setters
    public String getAtmId() { return atmId; }
    public void setAtmId(String atmId) { this.atmId = atmId; }
    public String getBranchName() { return branchName; }
    public void setBranchName(String branchName) { this.branchName = branchName; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getReserveStatus() { return reserveStatus; }
    public void setReserveStatus(String reserveStatus) { this.reserveStatus = reserveStatus; }
}
