# Survival Bootcamp Site

## Description

- This is a React application that allows users to sign up for survival courses from famous horror movie characters. Users can create accounts, log in, and explore available courses. Instructors can view and manage their appointments.

## Features

- User Authentication (Login, Signup)

- Instructor vs Client Roles

- Course Information Display

- Appointment Scheduling

- Dynamic Footer based on User Login Status

## Technologies

- Frontend: React, React Router DOM, Redux, Tailwind

## Installation

- Clone this repository.
- Install dependencies: npm install

### Usage

- Backend Setup (not included):

- Set up a PostgreSQL database.

- Create a backend server using Express.js and integrate with the database.

- Implement API endpoints for user authentication, course data retrieval, and appointment scheduling.
  Frontend Development:

- Start the development server: npm start
  The application will be available at http://localhost:5090/

### Folder Structure

- package.json: Contains project dependencies and scripts.
- src: Contains the React application source code.
- App.jsx: The main application component.
- components: Reusable React components.
- DatePicker.jsx: Date picker component for appointment scheduling.
- LogoutButton.jsx: Button component for user logout.
- Layouts: Layout components.
- Footer.jsx: Footer component that dynamically changes based on user login status.
- pages: Pages of the application.
- AdministratorPage.jsx: Page for instructors to view appointments.
- ClientProfile.jsx: Page for clients to view appointments.
- Courses.jsx: Page displaying course information.
- ErrorPage.jsx: Page for handling routing errors.
- Home.jsx: The homepage of the application.
- LoginPage.jsx: Login page for users.
- SignUp.jsx: Signup page for new users.
- index.css: Global styles for the application.
- public: Contains static assets like images.

### Scripts

- npm start: Starts the development server.
- npm build: Builds the application for production.
- npm seed: Seeds the database (requires backend setup).

### License

- This project is licensed under MIT License.

#### Additional Notes

- This is a basic implementation and can be further extended with features like course reviews, instructor bios, and payment processing.
  The backend and database setup are not included in this repository.
  File Descriptions:

- InstructorsUI.jsx: Displays information about instructors, including their names, titles, descriptions, and images.
- LoginPage.jsx: Handles user login functionality, allowing users to enter their email and password to access the application.
- SignUp.jsx: Handles user signup functionality, allowing users to create new accounts with email, password, first name, and last name.
- globalReducer.js: Manages the global state of the application, handling actions related to user login, instructor status, and available dates.
- store.js: Configures the Redux store for state management.
- db.js: Handles the connection to the PostgreSQL database.
- seed.js: Populates the database with initial data (instructors, courses, availabilities) for testing purposes.
- server.js: (Not included) The backend server that handles API requests for user authentication, course data retrieval, and appointment scheduling.
