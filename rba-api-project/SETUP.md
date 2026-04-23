# Task Manager API - Project Setup

## Project Structure

```
assignment-project/
├── backend/              # FastAPI Backend
│   ├── venv/            # Python virtual environment
│   ├── main.py          # FastAPI app entry point
│   ├── auth.py          # Authentication logic
│   ├── database.py      # Database configuration
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── requirements.txt # Python dependencies
│   ├── .env             # Environment variables
│   └── test.db          # SQLite database
│
└── frontend/            # React Frontend
    ├── public/          # Static files
    ├── src/            # React components
    ├── package.json    # Node dependencies
    ├── vite.config.js  # Vite configuration
    └── README.md       # Frontend documentation
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
. venv/bin/activate  # On macOS/Linux
# or on Windows:
# venv\Scripts\activate

# Install dependencies (already done)
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs on: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
cd frontend
npm install  # Already done

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5174` (or next available port)

## Features Implemented

### Backend (FastAPI)
- ✅ User registration & login with password hashing
- ✅ JWT authentication
- ✅ Role-based access control (user/admin)
- ✅ CRUD APIs for tasks
- ✅ Comprehensive error handling
- ✅ CORS middleware for frontend integration
- ✅ Swagger/OpenAPI documentation at `/docs`

### Frontend (React + Vite)
- ✅ User registration form
- ✅ Login form with JWT token handling
- ✅ Protected dashboard
- ✅ Task management (Create, Read, Update, Delete)
- ✅ Token persistence in localStorage
- ✅ Error/success messages
- ✅ Responsive UI

## API Endpoints

### Authentication
- `POST /api/v1/register` - Register new user
- `POST /api/v1/login` - Login and get JWT token
- `GET /api/v1/protected` - Test protected route

### Tasks
- `GET /api/v1/tasks` - Get all tasks for logged-in user
- `POST /api/v1/tasks` - Create a new task
- `PUT /api/v1/tasks/{task_id}` - Update a task
- `DELETE /api/v1/tasks/{task_id}` - Delete a task

### Admin
- `GET /api/v1/admin/users` - Get all users (admin only)

## Testing the Application

1. **Register a user:**
   - Go to http://localhost:5174
   - Click "Register"
   - Enter username and password
   - Click "Register"

2. **Login:**
   - Enter credentials
   - Click "Login"

3. **Manage Tasks:**
   - Create new tasks in the input field
   - Check/uncheck to mark as complete
   - Edit task titles inline
   - Delete tasks with the delete button

## Environment Variables

Backend uses `.env` file with:
- `SECRET_KEY` - JWT secret key
- Database URL if using PostgreSQL/MySQL

## Database

Currently using SQLite (`test.db`) in the backend folder. To use PostgreSQL/MySQL:
1. Update `DATABASE_URL` in `.env`
2. Update database connection in `database.py`

## Troubleshooting

### Port already in use
```bash
# Kill process on port 8000
lsof -i :8000
kill -9 <PID>

# Kill process on port 5174
lsof -i :5174
kill -9 <PID>
```

### Virtual environment issues
```bash
cd backend
rm -rf venv
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
```

## Next Steps for Production

1. **Database:** Migrate to PostgreSQL for scalability
2. **Security:** Use environment variables for secrets, implement rate limiting
3. **Deployment:** 
   - Deploy backend on Render/Railway/Heroku
   - Deploy frontend on Vercel/Netlify
4. **Caching:** Add Redis for session management
5. **Logging:** Implement proper logging system
6. **Testing:** Add unit and integration tests

## Security Notes

- Passwords are hashed with bcrypt
- JWT tokens are signed and verified
- CORS is configured to allow frontend requests
- Input validation on all endpoints
- Role-based access control for admin endpoints
