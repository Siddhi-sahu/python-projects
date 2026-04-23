from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from database import SessionLocal
from database import engine, Base
import models, schemas, auth
from auth import get_current_user, require_admin
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Task Manager API",
    version="1.0.0",
    description="REST API with JWT auth and role-based access"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

v1 = APIRouter(prefix="/api/v1")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)

@v1.get("/")
def root():
    return {"message": "API is working"}

@v1.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = auth.hash_password(user.password)
    new_user = models.User(username=user.username, password=hashed)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created"}

@v1.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not auth.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_token({"sub": db_user.username, "role": db_user.role})
    return {"access_token": token, "token_type": "bearer"}

@v1.get("/protected")
def protected(user = Depends(get_current_user)):
    return {"message": "You are authorized", "user": user}

@v1.post("/tasks", response_model=schemas.TaskOut)
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    db_user = db.query(models.User).filter(models.User.username == user["sub"]).first()
    new_task = models.Task(title=task.title, owner_id=db_user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@v1.get("/tasks", response_model=list[schemas.TaskOut])
def get_tasks(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    db_user = db.query(models.User).filter(models.User.username == user["sub"]).first()
    return db.query(models.Task).filter(models.Task.owner_id == db_user.id).all()

@v1.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    db_user = db.query(models.User).filter(models.User.username == user["sub"]).first()
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == db_user.id
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted"}

@v1.put("/tasks/{task_id}", response_model=schemas.TaskOut)
def update_task(
    task_id: int,
    updated_task: schemas.TaskCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    db_user = db.query(models.User).filter(models.User.username == user["sub"]).first()
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == db_user.id
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.title = updated_task.title
    task.completed = updated_task.completed
    db.commit()
    db.refresh(task)
    return task

@v1.get("/admin/users", dependencies=[Depends(require_admin)])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

app.include_router(v1)