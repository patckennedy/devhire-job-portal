# DevHire: Full-Stack Job Platform for Software Engineers

DevHire is a full-stack job platform built as a solo project using the PERN stack (PostgreSQL, Express.js, React, Node.js) and designed specifically for software engineers. The application enables recruiters to post jobs, manage applications, and connect with talent, while job seekers can search, apply, and track their application status — all in one place.

---

## 🚀 Key Features
- **Role-Based Authentication:** Secure authentication for recruiters and job seekers.  
- **Dynamic Dashboards:** Recruiter dashboards (manage jobs, view applicants) and job seeker dashboards (track applications, save favorites).  
- **RESTful API:** Clear separation of concerns with robust API design.  
- **Real-Time Status Updates:** Recruiter updates instantly visible to job seekers.  
- **Modern UI/UX:** Responsive React frontend styled with Tailwind CSS.  

---

## 🏗️ Tech Stack
- **Frontend:** React, Tailwind CSS, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (scalable, relational design)  
- **Authentication:** Passport.js (JWT + session-based options)  
- **State Management:** Zustand  
- **Other Tools:** Axios, Shadcn UI  

---

## 💻 Getting Started
1. Clone the repo:
    ```bash
    git clone https://github.com/patckennedy/DevHire.git
    cd DevHire
    ```
2. Install dependencies for both frontend and backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```
3. Configure environment variables:
    - Copy `.env.example` to `.env` in `/server` and fill in database URL, JWT secret, etc.

4. Set up the database:
    - Create a PostgreSQL database locally or use a managed service like Supabase or Neon.
    - Run database migrations (see `/server/database.sql`).

5. Run the app:
    - In `/server`:
        ```bash
        npm run dev
        ```
    - In `/client`:
        ```bash
        npm start
        ```

---

## 🌐 Live Demo
Deployment in progress.  
➡️ In the meantime, the app can be run locally by following the setup instructions above.

---

## 🛡️ Backend Focus
My background in IT support, database management, and network security influenced the backend design of DevHire. Priorities included:  
- **Data Integrity:** Normalized relational schemas (PostgreSQL).  
- **Security:** Role-based access, encrypted tokens, input validation, and secure deployments.  
- **Scalability:** Designed for migration to managed cloud databases (Supabase, Neon, AWS RDS).  
- **Testing:** Structure in place for backend tests and API validation (future: Jest + Supertest).  

---

## 🔗 Future Improvements
- **Cloud Database Integration:** Migrate PostgreSQL to Supabase/Neon for easier scaling.  
- **Third-Party API Integrations:** Skills analysis, job scraping, interview scheduling.  
- **Notifications:** Real-time email and in-app notifications (Nodemailer, WebSockets).  
- **AI Interview Coach:** Chatbot for job seeker technical prep.  
- **Analytics Dashboard:** Admin reporting and performance insights.  

---

## 📈 What Sets DevHire Apart
DevHire is architected for growth and real-world extensibility — not just another CRUD job board. My IT background means I focus on:  
- Database performance tuning  
- Scalable API architecture  
- Security-first design  
- Realistic deployment (Docker, cloud databases, CI/CD — coming soon)  

---

## 👩🏾💻 About Me
**Patricia Kennedy**  
- Full-stack developer (React, Node.js, PostgreSQL)  
- 5+ years in IT support & network security  
- Passionate about building useful, reliable software  

**Connect with me:**  
- [Portfolio](https://patckennedy.com)  
- [LinkedIn](https://linkedin.com/in/patriciakennedy)  
- [GitHub](https://github.com/patckennedy)  

---

## 📄 License
MIT

---

I built DevHire to demonstrate my ability to design, secure, and scale robust backend systems while continuing to grow as a developer. Thanks for visiting!
