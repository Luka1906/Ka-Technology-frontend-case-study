# # Email Service Application (Front End Case Study)

## Description
Full-stack email application developed as part of an interview case study. I redesigned the frontend using React and integrated it with an existing Flask backend, implementing authentication, session management, and core email workflows.


---

## Features
- User authentication (register, login, logout)
- Session-based access control
- Send and receive emails (simulated)
- Inbox with labeled messages (sent/inbox)
- React-based frontend replacing static HTML client

---

## Tech Stack
- Frontend: React (Vite)
- Backend: Flask (Python)
- API: RESTful endpoints
- Authentication: Session-based

---

## Setup

### Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

### Frontend
cd frontend
npm install
npm run dev
