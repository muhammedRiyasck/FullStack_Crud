# Mini FullStack CRUD App

A full-stack CRUD application built with the MERN stack (MongoDB, Express.js, React, Node.js) after completing MERN stack studies, with a focus on React and Redux for the frontend. This project demonstrates user authentication, profile management, and an admin panel for managing users.

## Features

- **User Authentication**: Login and registration with JWT tokens.
- **Profile Management**: View and edit user profiles, including image uploads to Cloudinary.
- **Admin Panel**: Admin users can view, add, edit, and manage other users.
- **Protected Routes**: Separate routes for authenticated users and admin users.
- **Responsive Design**: Built with TailwindCSS for a modern, responsive UI.
- **State Management**: Uses Redux Toolkit for global state management.
- **Type Safety**: Full TypeScript support on both frontend and backend.

## Tech Stack

### Frontend
- **React**: UI library with hooks and functional components.
- **TypeScript**: For type safety.
- **Vite**: Fast build tool and development server.
- **Redux Toolkit**: State management.
- **React Router DOM**: Client-side routing.
- **TailwindCSS**: Utility-first CSS framework.
- **Axios**: HTTP client for API calls.
- **Sonner**: Toast notifications.

### Backend
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework.
- **TypeScript**: For type safety.
- **MongoDB**: NoSQL database with Mongoose ODM.
- **JWT**: JSON Web Tokens for authentication.
- **bcryptjs**: Password hashing.
- **Cloudinary**: Image upload and management.
- **Multer**: File upload middleware.
- **class-validator & class-transformer**: Validation and transformation.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### Steps
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mini-fullstack
   ```

2. **Install dependencies**:
   - For the root (to run concurrently):
     ```bash
     npm install
     ```
   - For the client:
     ```bash
     cd client
     npm install
     cd ..
     ```
   - For the server:
     ```bash
     cd server
     npm install
     cd ..
     ```

4. **Start the application**:
   ```bash
   npm start
   ```
   This will start both the client (on port 5173) and server (on port 3000) concurrently.

## Usage

- Open your browser and navigate to `http://localhost:5173`.
- Register a new account or login with existing credentials.
- Access your profile to view and edit information.
- If you have admin privileges, access the admin panel at `/adminDashboard` to manage users.

### API Endpoints

- **User Routes** (`/api`):
  - `POST /register`: Register a new user.
  - `POST /login`: Login user.
  - `GET /profile`: Get user profile.
  - `PUT /profile`: Update user profile.
  - `POST /logout`: Logout user.

- **Admin Routes** (`/api`):
  - `GET /users`: Get all users (admin only).
  - `POST /users`: Add a new user (admin only).
  - `PUT /users/:id`: Edit a user (admin only).
  - `DELETE /users/:id`: Delete a user (admin only).

## Project Structure

```
mini-fullstack/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Redux slices
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── models/         # Mongoose models
│   │   ├── repositories/   # Data access layer
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── types/          # TypeScript types
│   └── package.json
├── package.json            # Root package for concurrent running
└── README.md
```


