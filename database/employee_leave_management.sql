#To create database 
CREATE DATABASE employee_leave_management;

#to select the database
use employee_leave_management;


#Create Employee Table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    department VARCHAR(50)
);

#Create Leave Table
CREATE TABLE leaves (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY(employee_id) REFERENCES employees(id)
);

#Insert Sample Data
INSERT INTO employees(name,email,department)
VALUES
('Danesh','dani@gmail.com','IT'),
('adhisindha','adhi@gmail.com','TL'),
('jesinder','jessi@gmail.com','Manager');

