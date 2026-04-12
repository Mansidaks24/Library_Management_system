from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# This will create a file named "library.db" in your backend folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./library.db"

# connect_args={"check_same_thread": False} is required for SQLite in FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to use in your FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()