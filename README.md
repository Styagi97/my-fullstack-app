# Login and User Management System

This project is a full-stack application that provides user authentication and management features. It includes a Spring Boot backend for handling user registration, login, and role-based access control, and a React frontend for interacting with the backend.

## Features

- **User Registration**: Users can register with a username, email, password, and role (USER or ADMIN).
- **User Login**: Registered users can log in using their email and password.
- **Role-Based Access Control**: Different roles (USER and ADMIN) have access to different parts of the application.
- **User Management**: Admins can view, edit, and delete users.
- **JWT Authentication**: JSON Web Tokens (JWT) are used for secure authentication.

## Technologies Used

- **Backend**: Spring Boot, Spring Security, JWT, MySQL
- **Frontend**: React, React Router, Axios, Bootstrap
- **Database**: MySQL

## Prerequisites

- Java Development Kit (JDK) 17 or higher
- Node.js and npm
- MySQL database
 
### Usage
**1.Register a new user:**
         Navigate to the registration page.
         Fill in the required details (username, email, password, confirm password, and role).
         Click "Register".

**2.Login:**
      Navigate to the login page.
      Enter your email and password.
      Click "Login".

**3.Admin Dashboard:**
      Admins can view, edit, and delete users from the admin dashboard.

**4.User Home:**
      Regular users can view their details on the user home page.
      
   ### Notes:
1. Replace `your-repo`, `your-secret-key`, and `your-github` with your actual repository URL, JWT secret key, and GitHub profile link.
2. If you're using a different database (e.g., MySQL, PostgreSQL), update the `application.properties` file with the appropriate configuration. 
