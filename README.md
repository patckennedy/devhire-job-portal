
# DevHire: Full-Stack Job Platform for Software Engineers

DevHire is a modern, full-stack job platform built with the PERN stack (PostgreSQL, Express, React, Node.js) and designed specifically for software engineers. This application enables recruiters to post jobs, manage applications, and connect with talent, while job seekers can search, apply, and track their application status—all in one place.
---

## 🚀 Key Features
- **Role-Based Authentication:** Secure, custom authentication for both recruiters and job seekers.
- **Dynamic Dashboards:** Separate dashboards for recruiters (manage jobs, view applicants) and job seekers (view jobs, track applications, save favorites).
- **RESTful API:** Robust API architecture with clear separation of concerns.
- **Real-Time Status Updates:** Recruiters can update application statuses; job seekers see updates instantly.
- **Modern UI/UX:** Responsive React frontend styled with Tailwind CSS.
---

## 🏗️ Tech Stack
- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (designed for scalability and relational integrity)
- **Authentication:** Passport.js (JWT + session-based options)
- **State Management:** Zustand
- **Other:** Axios, Shadcn UI
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
    - Copy `.env.example` to `.env` in `/server` and fill in your database URL, JWT secret, etc.

4. Set up the database:
    - Create a PostgreSQL database locally or use a managed service like Supabase or Neon for easier cloud deployment.
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
- **Portfolio:** [patckennedy.com](https://patckennedy.com)
- **Demo link:** Coming soon
---

## 🛡️ Backend
My background in database development, server administration, and network security gives me an edge in building secure and scalable backend systems. For DevHire, I’ve prioritized:
- **Data Integrity:** Carefully normalized relational schemas (PostgreSQL).
- **Security:** Strict role-based access, encrypted tokens, input validation, and best practices for secure deployments.
- **Scalability:** Designed to support cloud migration (Supabase, Neon, AWS RDS, etc.).
- **Testing:** Clear structure for backend tests and API validation (future: full test suite with Jest and Supertest).
---

## 🔗 Future Improvements
- **Cloud Database Integration:** Plan to migrate from local PostgreSQL to a cloud-managed service like Supabase or Neon for easy deployment and scaling.
- **Third-Party API Integrations:** Will integrate real-world APIs for skills analysis, job scraping, or interview scheduling.
- **Notifications:** Real-time email and in-app notifications (using Nodemailer and WebSockets).
- **AI Interview Coach:** AI-powered chatbot to help job seekers prep for technical interviews.
- **Analytics Dashboard:** Advanced admin reporting and performance insights for recruiters.
---

## 📈 What Sets DevHire Apart
DevHire isn’t just another CRUD job board—it's architected for real-world growth and professional extensibility. My experience in IT infrastructure and backend development means I think deeply about:
- Database performance tuning
- Scalable API architecture
- Security from day one
- Realistic production deployment (Docker, cloud DB, CI/CD—coming soon)
---

## 👩🏾💻 About Me
**Patricia Kennedy**  
- Full-stack developer (React, Node.js, PostgreSQL)  
- IT support & network security background (5+ years)  
- Passionate about building useful software for real people  

**Let’s connect:**  
- [Portfolio](https://patckennedy.com)  
- [LinkedIn](https://linkedin.com/in/YOUR-LINKEDIN)  
- [GitHub](https://github.com/YOUR-USERNAME)  
---

## 📄 License
MIT

---

I built DevHire to demonstrate my ability to design, secure, and scale robust backend systems while continuously learning and growing as a developer. Thank you for checking it out!
