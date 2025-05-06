const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// POST /api/apply - Submit an application
router.post('/applied-jobs', upload.single('resume'), async (req, res) => {
    const {
        user_id,
        job_id,
        skills,
        experience, // this should map to years_of_experience
    } = req.body;

    const resumeFile = req.file;

    const sql = `
        INSERT INTO applications 
        (user_id, job_id, skills, years_of_experience, resume_link) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        user_id,
        job_id,
        skills,
        experience,
        resumeFile?.originalname || null,
    ];

    try {
        const result = await pool.query(sql, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

//----------------------------------------------------------------------------------
// POST /api/applied-jobs - Submit a new job application
router.post('/', upload.single('resume'), async (req, res) => {
    const {
        user_id,
        job_id,
        skills,
        experience, // or years_of_experience
    } = req.body;

    const resumeFile = req.file;

    const sql = `
        INSERT INTO applications 
        (user_id, job_id, skills, years_of_experience, resume_link) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        user_id,
        job_id,
        skills,
        experience,
        resumeFile?.originalname || null,
    ];

    try {
        const result = await pool.query(sql, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
