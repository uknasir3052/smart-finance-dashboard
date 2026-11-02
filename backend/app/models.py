from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, index=True, default="Uncategorized")
    date = Column(DateTime, default=datetime.utcnow, index=True)