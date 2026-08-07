# Week 5 – Student Record Management System

## Overview

This project is a full-stack Student Record Management System developed during my internship.

It demonstrates how to build a secure CRUD application using Node.js, Express, PostgreSQL, Sequelize ORM, JWT Authentication, and EJS.

Users can register, log in, and securely manage student records.

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt
- Express Validator
- EJS
- HTML
- CSS

---

## Features

- User Registration
- User Login
- Password Hashing
- JWT Authentication
- Protected Routes
- Student CRUD Operations
- Form Validation
- Flash Messages
- PostgreSQL Database
- Sequelize Models

---

## Project Structure

```text
student_record_system/
│
├── config/
├── middleware/
├── models/
├── routes/
├── public/
├── views/
├── data/
├── index.js
├── package.json
└── README.md
```

---

## Installation

### Clone

```bash
git clone https://github.com/Jeehan06/student_management_system.git
```

### Install

```bash
npm install
```

### Configure

Create a `.env` file containing your PostgreSQL credentials and JWT secret.

Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=student_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret
```

### Run

```bash
npm start
```

Open

```
http://localhost:3000
```

---

## What I Learned

- Express Routing
- MVC Structure
- Authentication using JWT
- Password Hashing
- Sequelize ORM
- PostgreSQL Integration
- Input Validation
- CRUD Operations
- Middleware
- Session Management

---

## Future Improvements

- Role-based Authorization
- Dashboard
- Attendance Module
- REST API
- Docker Support
- Unit Testing

---

## Author

**Jeeshan**

Created as part of my internship while learning backend development using Node.js and PostgreSQL.
