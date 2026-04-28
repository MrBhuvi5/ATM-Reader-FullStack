# ATM Reader FullStack Web Application 💳

![Java](https://img.shields.io/badge/Java-Backend-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-Framework-green)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![Maven](https://img.shields.io/badge/Maven-Build-red)

## 🚀 Live Demo
https://mrbhuvi5.github.io/ATM-Reader-FullStack/

### Demo Credentials
```text
ATM ID: iob0001, iob0002, iob0003, iob0004, iob0005, sbi5001, sbi5002, sbi5003
Locations: Chennai, Thiruvarur

Customer ID: 123
PIN: 1234
```

## Overview
ATM FullStack Web Application is a Java-based full-stack project designed to simulate real-world ATM operations while also helping users check ATM cash availability before visiting an ATM.

Unlike a traditional ATM simulation, this application not only supports banking transactions such as authentication, withdrawals, deposits, and balance inquiry, but also allows users to view the cash availability status of an ATM in real time.

The system updates both:
- Customer bank account records
- ATM cash reserve database

This helps simulate how an ATM network tracks available cash while processing transactions.

## Screenshots

### Home Page
<p align="left">
<img src="Images/1. Home page.png" width="30%">
</p>

### Find ATM ID
<p align="left">
  <img src="Images/2. Find ATM ID.png" width="30%">
  <img src="Images/3. Search result.png" width="30%">
</p>

### ATM Cash Reserve
<p align="left">
  <img src="Images/4. Check Cash Reserve.png" width="30%">
  <img src="Images/5. ATM Cash Reserve Status.png" width="30%">
</p>

### ATM Simulation
<p align="left">
  <img src="Images/6. ATM Operation 1 Choose an ATM.png" width="30%">
  <img src="Images/7. ATM Operation 2 User Authentication.png" width="30%">
</p>

### ATM Operations
<p align="left">
  <img src="Images/8. Account Status.png" width="30%">
  <img src="Images/9. Withdraw.png" width="30%">
  <img src="Images/10. Deposit.png" width="30%">
</p>

## Key Features
### ATM Cash Availability Tracking
Users can:
- Check whether an ATM has sufficient cash available
- View ATM cash reserve status
- Verify availability before initiating withdrawal
- Avoid visiting ATMs with low or empty cash reserves

This is the core functionality of the project.

## Features
- ATM Cash Availability Check
- User Authentication (Customer ID / PIN)
- Balance Inquiry
- Cash Withdrawal
- Cash Deposit
- Real-Time ATM Cash Reserve Updates
- Account Balance Updates
- Transaction Validation
- Insufficient Cash Handling

## Tech Stack
### Backend
- Java
- Spring Boot
- JDBC
- Maven

### Frontend
- HTML
- CSS
- JavaScript

### Database
- MySQL

## Project Architecture
```text
User Interface
   ↓
Spring Boot Application
   ↓
MySQL Database
   ├── Account Holder Data
   └── ATM Cash Reserve Data
```

## Core Functional Modules

### 1. ATM Cash Availability Module
- Displays available cash in ATM
- Monitors reserve levels
- Updates after every withdrawal/deposit

### 2. Transaction Module
Supports:
- Withdrawals
- Deposits
- Balance Enquiry

### 3. Account Validation Module
- Customer authentication
- PIN verification
- Transaction authorization

## Real-World Scenarios Simulated
- ATM Out-of-Cash Detection
- Low Cash Availability Alerts
- Insufficient Account Balance
- Invalid PIN Handling
- Transaction Cancellation
- Cash Denomination Validation

## Project Structure
```bash
ATM-FullStack/
├── src/
├── .mvn/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

## Setup Instructions
### Clone Repository
```bash
git clone https://github.com/MrBhuvi5/ATM-Reader-FullStack.git
cd ATM-FullStack
```

### Configure Database
```sql
CREATE DATABASE atm;
```

Update database configuration:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/atm
spring.datasource.username=root
spring.datasource.password=your_password
```

### Run Application
```bash
./mvnw spring-boot:run
```

## Future Enhancements
- Nearby ATM Locator
- ATM Cash Level Alerts
- Multi-bank ATM Network Support
- Transaction History Dashboard
- Admin Monitoring Dashboard

## Learning Outcomes
This project helped in understanding:
- Full Stack Development
- ATM Network Simulation
- Real-Time Database Updates
- Banking and ATM Cash Management Logic

## Author
**Bhuvanesh S**
