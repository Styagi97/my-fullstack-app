# Frontend Application

This is the frontend part of the application built using **React** and **React Router** for navigation. It includes user authentication, role-based access control, and routing to different pages based on the user's role.

## Features
- **User Authentication**: Login and registration forms with validation.
- **Role-Based Access Control**: 
  - `USER` role can access `/userhome`.
  - `ADMIN` role can access `/dashboard`.
- **Protected Routes**: Unauthorized users are redirected to the login page or an "Unauthorized Access" page.
- **Form Handling**: Uses `Formik` and `Yup` for form management and validation.

## Technologies Used
- React
- React Router
- Formik
- Yup
- Axios (for API calls)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone  https://github.com/Styagi97/my-fullstack-app.git
   cd my-fullstack-app/frontend

2. **Install Dependencies**:
     ```bash
    npm install

3. **Start the Development Server**:
     ```bash
    npm start

4. **Access the Application**:
Open your browser and navigate to http://localhost:3000.