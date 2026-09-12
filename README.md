# RDSystem

RDSystem is a web-based Recurring Deposit (RD) management system developed using React and Spring Boot.

The system allows an administrator to manage RD customers, maintain monthly passbook entries, calculate late payment fines, and track RD maturity information.

## Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- REST API
- Gradle

### Frontend
- React.js
- Vite
- Axios
- React Router
- Bootstrap

### Tools
- VS Code
- Postman
- pgAdmin
- Git & GitHub

## Features

### Admin Login
- Admin login using a 10-digit Admin ID
- Admin authentication through backend API
- Admin dashboard after successful login

### RD User Management
- Add new RD customer
- View all RD customers
- Search customer by name
- Update customer details
- Delete RD customer
- Manage customer RD information

### Passbook Management
- Add monthly RD payment entries
- View passbook entries
- Update passbook entries
- Delete passbook entries
- View passbook for a specific RD customer

### RD Calculation

The system automatically calculates:

- Monthly RD amount
- Due date
- Late days
- Late payment fine
- Total number of installments
- Total amount to pay
- Total amount paid
- Maturity amount
- Current maturity amount
- Next RD payment date

### Fine Calculation

The RD installment due date is the **1st day of every month**.

If the customer pays on the 1st:

```text
Late Days = 0
Fine = ₹0
