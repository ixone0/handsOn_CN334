*** Settings ***
Library  RequestsLibrary
Library  Collections

*** Variables ***
# ใชชื่อ service 'api-server' (หรือชื่อที่ตั้งไวใน docker-compose) และใช port ภายในของ docker-compose คือ 8000 แทนที่จะใช 3340
${BASE_URL}  http://api-server:8000

*** Test Cases ***
Verify Get All Patients Successfully
    [Documentation]  ทดสอบการดึงขอมูลคนไขทั้งหมดจาก API
    Create Session  api_session  ${BASE_URL}
    ${response}=  GET On Session  api_session  url=/patients
    Status Should Be  200  ${response}
    Log To Console  \nResponse Data: ${response.json()}

Verify Create New Patient
    [Documentation]  ทดสอบการเพิ่มขอมูลคนไขใหมผาน POST
    Create Session  api_session  ${BASE_URL}
    ${payload}=  Create Dictionary  hn_number=HN999  patient_name=Robot Tester  exam_date=2026-03-31  diagnosis=Automated Testing
    ${headers}=  Create Dictionary  Content-Type=application/json
    ${response}=  POST On Session  api_session  url=/patients  json=${payload}  headers=${headers}
    Status Should Be  200  ${response}
