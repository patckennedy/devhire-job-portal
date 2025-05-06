const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads (resume)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// POST /api/apply - submit a job application
router.post('/', upload.single('resume'), async (req, res) => {
    const { user_id, job_id, years_of_experience, skills } = req.body;
    const resumeFile = req.file ? req.file.filename : null;

    try {
        const sqlText = `
            INSERT INTO applied_jobs (user_id, job_id, years_of_experience, skills, resume_file)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        const sqlValues = [
            user_id,
            job_id,
            years_of_experience,
            skills,
            resumeFile,
        ];

        const result = await pool.query(sqlText, sqlValues);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
