# Task Manager API - Full Stack Application

A complete full-stack application for managing tasks with user authentication, featuring a FastAPI backend and React frontend.

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Start Backend (Terminal 1)

```bash
cd backend
. venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**
API Documentation: **http://localhost:8000/docs**

### 2. Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will be available at: **http://localhost:5174**

## Project Overview

### Backend Features
- **User Authentication:** Registration and login with JWT
- **Password Security:** Bcrypt hashing
- **Role-Based Access Control:** User and Admin roles
- **Task Management:** Full CRUD operations
- **API Documentation:** Swagger/OpenAPI at `/docs`
- **CORS Support:** Configured for frontend requests

### Frontend Features
- **Clean UI:** Modern React interface with Vite
- **Authentication Forms:** Register and login pages
- **Protected Dashboard:** JWT-guarded task management
- **Task Operations:** Create, read, update, delete tasks
- **Real-time Updates:** Responsive task list
- **Error Handling:** User-friendly error messages

## Project Structure

```
assignment-project/
├── backend/              # FastAPI Backend
│   ├── venv/            # Python virtual environment
│   ├── main.py          # Main app file
│   ├── auth.py          # Authentication logic
│   ├── database.py      # Database setup
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── requirements.txt # Python dependencies
│   └── test.db          # SQLite database
│
├── frontend/            # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── SETUP.md            # Detailed setup guide
└── README.md           # This file
```

## API Endpoints

### Authentication
- `POST /api/v1/register` - Register new user
- `POST /api/v1/login` - Login with credentials
- `GET /api/v1/protected` - Protected test endpoint

### Tasks (Requires Authentication)
- `GET /api/v1/tasks` - Get user's tasks
- `POST /api/v1/tasks` - Create task
- `PUT /api/v1/tasks/{id}` - Update task
- `DELETE /api/v1/tasks/{id}` - Delete task

### Admin (Requires Admin Role)
- `GET /api/v1/admin/users` - List all users

## Testing the App

1. **Register:**
   - Navigate to http://localhost:5174
   - Click "Register"
   - Create new account

2. **Login:**
   - Log in with your credentials
   - Token automatically saved to localStorage

3. **Use Dashboard:**
   - Create new tasks
   - Edit task titles
   - Mark tasks as complete/incomplete
   - Delete tasks

## Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database
- **Pydantic** - Data validation
- **Python-Jose** - JWT handling
- **Bcrypt** - Password hashing
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS** - Styling

## Documentation

See [SETUP.md](SETUP.md) for:
- Detailed installation instructions
- Troubleshooting guide
- Production deployment steps
- Database migration guide

## Key Features

✅ **Security**
- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation

✅ **Scalability**
- Modular backend structure
- Reusable React components
- API versioning (`/api/v1/`)
- Database abstraction

✅ **Developer Experience**
- Hot reloading on both frontend and backend
- Comprehensive API documentation
- Clean folder structure
- Error handling and logging

## Deployment Ready

The application is structured for easy deployment:
- Backend can be deployed to Render, Railway, or Heroku
- Frontend can be deployed to Vercel or Netlify
- Database can be migrated to PostgreSQL
- Environment variables for sensitive data

## Next Steps

1. Add comprehensive testing
2. Implement refresh tokens
3. Add email verification
4. Set up CI/CD pipeline
5. Deploy to production
6. Add caching with Redis
7. Implement logging system

## Support

For issues or questions, refer to [SETUP.md](SETUP.md) troubleshooting section.

---

**Created for Backend Developer Intern Assignment**
