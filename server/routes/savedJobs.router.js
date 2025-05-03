// backend/routes/savedJobs.router.js
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Save a job (POST)
router.post('/', (req, res) => {
    const { user_id, job_id } = req.body;

    const sqlText = `
        INSERT INTO saved_jobs (user_id, job_id)
        VALUES ($1, $2)
        RETURNING *;
    `;

    pool.query(sqlText, [user_id, job_id])
        .then((result) => res.status(201).json(result.rows[0]))
        .catch((err) => {
            console.error('Error saving job:', err);
            res.sendStatus(500);
        });
});

// Get saved jobs by user (GET)
router.get('/:user_id', (req, res) => {
    const userId = req.params.user_id;

    const sqlText = `
        SELECT jobs.*
        FROM saved_jobs
        JOIN jobs ON saved_jobs.job_id = jobs.id
        WHERE saved_jobs.user_id = $1
        ORDER BY saved_jobs.saved_at DESC;
    `;

    pool.query(sqlText, [userId])
        .then((result) => res.json(result.rows))
        .catch((err) => {
            console.error('Error getting saved jobs:', err);
            res.sendStatus(500);
        });
});

//  Unsave a job (DELETE)
router.delete('/:user_id/:job_id', (req, res) => {
    const { user_id, job_id } = req.params;

    const sqlText = `
        DELETE FROM saved_jobs
        WHERE user_id = $1 AND job_id = $2;
    `;

    pool.query(sqlText, [user_id, job_id])
        .then(() => res.sendStatus(204))
        .catch((err) => {
            console.error('Error deleting saved job:', err);
            res.sendStatus(500);
        });
});

module.exports = router;
