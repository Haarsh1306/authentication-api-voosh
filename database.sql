-- Create database
CREATE DATABASE IF NOT EXISTS auth_app;
USE auth_app;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NULL,
    phone VARCHAR(20),
    bio VARCHAR(255),
    photo VARCHAR(500), 
    isProfilePublic BOOLEAN DEFAULT false,
    role ENUM('admin', 'user') DEFAULT 'user'
);