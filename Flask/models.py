from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import logging
from sqlalchemy import create_engine,String, ForeignKey, Integer, DateTime
from sqlalchemy.orm import sessionmaker,DeclarativeBase, relationship
from typing import List
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone
from sqlalchemy.sql import func


class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

class HR(db.Model):
    __tablename__ = "hr"
    user_id   : Mapped[int] = mapped_column(primary_key=True)
    user_name : Mapped[str] = mapped_column(String(100))
    password  : Mapped[str] = mapped_column(String(300))
    email     : Mapped[str] = mapped_column(String(100))

    def set_password(self, password):
        self.password = generate_password_hash(password) 
     
    def check_password(self, password): 
        return check_password_hash(self.password, password)
    
    
class Employee(db.Model):
    __tablename__ = "employee"
    employee_id: Mapped[int] = mapped_column(primary_key=True)
    employee_name: Mapped[str] = mapped_column(String(100))  
    email: Mapped[str] = mapped_column(String(100)) 
    total_leaves_used: Mapped[int] = mapped_column() 
    phone_number: Mapped[str] = mapped_column(String(100))
    address: Mapped[str] = mapped_column(String(150))
    designation_id: Mapped[int] = mapped_column(ForeignKey("designation.designation_id"))
    created_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    updated_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    deleted_at:Mapped[DateTime] = mapped_column(DateTime,nullable=True)

    
    designation: Mapped["Designation"] = relationship("Designation", back_populates="employee")
   

class Designation(db.Model):
    __tablename__ = "designation"
    designation_id : Mapped[int] = mapped_column(primary_key=True)
    designation_name : Mapped[str] = mapped_column(String(100))
    max_permitted_leave:Mapped[int] = mapped_column()
    created_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    updated_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    deleted_at:Mapped[DateTime] = mapped_column(DateTime,nullable=True)

    employee: Mapped[List["Employee"]] = relationship("Employee",back_populates="designation",cascade="all, delete-orphan")









def init_db(db_uri='postgresql://postgres:password@localhost:5432/hrms'):
    logger = logging.getLogger("FlaskApp")
    engine = create_engine(db_uri)
    Base.metadata.create_all(engine)
    logger.info("Created database")

def get_session(db_uri):
    engine = create_engine(db_uri)
    Session = sessionmaker(bind = engine)
    session = Session()
    return session