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
<p align="center">
  <img src="https://github.com/MrBhuvi5/ATM-Reader-FullStack/blob/3e8e5bef14872819295e2dfdbfba7975105d78ab/Images/1.%20Home%20page.png" width="70%">
</p>

### Find ATM ID

<p align="center">
  <img src="https://github.com/user-attachments/assets/2c9c7887-bcec-4844-a3c7-5f69b0678b3f" width="45%" />
  <img src="https://github.com/user-attachments/assets/b9084b46-1549-447a-8964-988739852f5e" width="45%" />
</p>

### ATM Cash Availability
<p align="center">
  <img width="635" height="444" alt="Image" src="https://github.com/user-attachments/assets/eb66548c-2309-4b66-bd13-a01019436548" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c3d85e84-4dc5-41ff-9185-17c4a3841fb0" width="45%" />
  <img src="https://github.com/user-attachments/assets/b56c5875-9b9f-429d-a5f6-fb7a68f55659" width="45%" />
</p>

### ATM Simulation

<p align="center">
  <img src="https://github.com/user-attachments/assets/fc05b6a0-3252-46af-bbeb-d8a15dd4f00d" width="45%" />
  <img src="https://github.com/user-attachments/assets/d717ed75-0dda-40bf-86cc-a1d55fafe1f3" width="45%" />
</p>

### ATM Operations

<p align="center">
  <img width="635" height="444" alt="Image" src="https://github.com/user-attachments/assets/6c2243cd-7871-4d76-9396-cd1acf79e9c6" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/fdb42dad-fe3d-46ad-bb74-6cb00044af0d" width="45%" />
  <img src="https://github.com/user-attachments/assets/b50e6e51-0576-409d-a42c-3facaa1bd7b7" width="45%" />
</p>

## Key Feature
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
git clone https://github.com/MrBhuvi5/ATM-Reader-FullStack
.git
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
