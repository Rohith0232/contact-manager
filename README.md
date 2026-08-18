# 📱 Contact Manager

A full-stack Contact Manager application built using React, Node.js, Express.js, MongoDB, and JWT authentication.

The application allows users to register and log in securely, and manage their personal contacts. Each user can create, view, update, and delete their own contacts.

---

## 🚀 Features

### User Authentication
- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Current user information
- Logout functionality

### Contact Management
- Add new contacts
- View all personal contacts
- View contact details
- Update contacts
- Delete contacts
- Contacts are associated with the logged-in user

### Security
- Passwords are stored using bcrypt hashing
- JWT tokens are used for authentication
- Protected contact APIs
- Users can only manage their own contacts
- Environment variables are used for sensitive configuration

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcrypt

### Development Tools
- VS Code
- Thunder Client
- Git
- GitHub

---

## 📂 Project Structure

```text
contact-manager/
│
├── config/
│   └── dbconnection.js
│
├── controllers/
│   ├── contactcontrolers.js
│   └── usercontroller.js
│
├── middleware/
│   ├── errorhandling.js
│   └── tokenvalidation.js
│
├── models/
│   ├── contactmodel.js
│   └── usermodel.js
│
├── routes/
│   ├── contactroute.js
│   └── userroutes.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── .gitignore
├── package.json
├── server.js
└── README.md
