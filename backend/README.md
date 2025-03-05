# Login-Springboot
This project is a full-stack application that provides user authentication and management features. It includes a Spring Boot backend for handling user registration, login, and role-based access control, and a React frontend for interacting with the backend.

## Features

**User Registration**: Users can register with a username, email, password, and role (USER or ADMIN).
**User Login**: Registered users can log in using their email and password.
**Role-Based Access Control**: Different roles (USER and ADMIN) have access to different parts of the application.
**User Management**: Admins can view, edit, and delete users.
**JWT Authentication**: JSON Web Tokens (JWT) are used for secure authentication.


## Technologies Used
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- Hibernate (JPA)
- Lombok (for boilerplate code reduction)
- MySQL (or any other database)

## Prerequisites

- Java Development Kit (JDK) 17 or higher
- Node.js and npm
- MySQL database

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Styagi97/my-fullstack-app.git
   cd lmy-fullstack-app/backend

2. **Configure the Database:**
	Create a MySQL database named login_springboot. 
	Update the application.properties file in the src/main/resources directory with your database credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/login_springboot
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

### Steps to Run the Project

1.**Build the Project:** 
 mvn clean install

**Run the Application:** 
mvn spring-boot:run

**Access the Application:**
The application will start on http://localhost:8080.  