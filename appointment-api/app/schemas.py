from pydantic import BaseModel

class AppointmentForm(BaseModel):
    idCard: str
    fullName: str
    phone: str
    gender: str
    dob: str
    address: str
    maritalStatus: str
    appointmentDate: str
    appointmentTime: str

class PatientRecordBase(BaseModel):
    hn_number: str
    patient_name: str
    exam_date: str
    diagnosis: str

class PatientRecordCreate(PatientRecordBase):
    pass
    
class PatientRecord(PatientRecordBase):
    id: int
    class Config:
        orm_mode = True