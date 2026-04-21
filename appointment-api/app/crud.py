from sqlalchemy.orm import Session
from app import models, schemas

def create_appointment(db: Session, appointment: schemas.AppointmentForm):
    db_appointment = models.Appointment(
        idCard=appointment.idCard,
        fullName=appointment.fullName,
        phone=appointment.phone,
        gender=appointment.gender,
        dob=appointment.dob,
        address=appointment.address,
        maritalStatus=appointment.maritalStatus,
        appointmentDate=appointment.appointmentDate,
        appointmentTime=appointment.appointmentTime
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def get_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Appointment).offset(skip).limit(limit).all()

def create_patient_record(db: Session, record: 
schemas.PatientRecordCreate):
    db_record = models.PatientRecord(**record.dict())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_patient_records(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.PatientRecord).offset(skip).limit(limit).all()

def update_patient_record(db: Session, record_id: int, record: 
schemas.PatientRecordCreate):
    db_record = db.query(models.PatientRecord).filter(models.PatientRecord.id == record_id).first()
    if db_record:
        for key, value in record.dict().items():
            setattr(db_record, key, value)
        db.commit()
        db.refresh(db_record)
    return db_record

def delete_patient_record(db: Session, record_id: int):
    db_record = db.query(models.PatientRecord).filter(models.PatientRecord.id == 
record_id).first()
    if db_record:
        db.delete(db_record)
        db.commit()
    return db_record

def update_appointment(db: Session, appointment_id: int, appointment: schemas.AppointmentForm):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if db_appointment:
        for key, value in appointment.dict().items():
            setattr(db_appointment, key, value)
        db.commit()
        db.refresh(db_appointment)
    return db_appointment

def delete_appointment(db: Session, appointment_id: int):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if db_appointment:
        db.delete(db_appointment)
        db.commit()
    return db_appointment
