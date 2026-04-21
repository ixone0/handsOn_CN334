from sqlalchemy import Column, Integer, String
from app.database import Base
class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    idCard = Column(String, index=True)
    fullName = Column(String)
    phone = Column(String)
    gender = Column(String)
    dob = Column(String)
    address = Column(String)
    maritalStatus = Column(String)
    appointmentDate = Column(String)
    appointmentTime = Column(String)

class PatientRecord(Base):
    __tablename__ = "patient_records"
    id = Column(Integer, primary_key=True, index=True)
    hn_number = Column(String, index=True)
    patient_name = Column(String)
    exam_date = Column(String)
    diagnosis = Column(String)