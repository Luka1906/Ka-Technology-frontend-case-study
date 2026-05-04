# Email Service Application (Front End Case Study)

## Description
Full-stack email application developed as part of an interview case study. I redesigned the frontend using React and integrated it with an existing Flask backend, implementing authentication, session management, and core email workflows.  

The focus was on building a responsive UI, managing client-side state, and structuring the application using modern React Router patterns.

---

## Features
- User authentication (register, login, logout)
- Session-based access control
- Send and receive emails (simulated backend)
- Inbox and Sent views with dynamic routing
- Email preview panel with shared state across routes
- Client-side search and filtering (by sender, subject, content)
- Modal-based email composition
- Active navigation with route-based UI state
- Responsive layout (sidebar + list + preview)

---

## Tech Stack
- Frontend: React (Vite), React Router
- Styling: Tailwind CSS
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