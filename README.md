# Employee Management System

## Requirements
- Node.js
- MySQL2
- MySQL Workbench

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with your database credentials.
4. Start the server: `node app.js`.

## API Endpoints
- GET /employees
- POST /employees
- PUT /employees/:id
- DELETE /employees/:id

## created the database on mysql workbench
## this where the SQL Script

## CREATE DATABASE employee_management;

USE employee_management;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO employees (name, position, salary)
VALUES 
    ('John Doe', 'Developer', 70000.00),
    ('Jane Smith', 'Designer', 65000.00);


SELECT * FROM employees