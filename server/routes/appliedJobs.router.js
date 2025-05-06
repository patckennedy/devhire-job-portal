const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// route fetches all jobs user has applied to
router.get('/:user_id', (req, res) => {
    const userId = req.params.user_id;

    const sqlText = `
        SELECT jobs.*
        FROM applications
        JOIN jobs ON applications.job_id = jobs.id
        WHERE applications.user_id = $1
        ORDER BY applications.id DESC;
    `;

    pool.query(sqlText, [userId])
        .then((result) => {
            res.status(200).json(result.rows);
        })
        .catch((err) => {
            console.error('Error fetching applied jobs:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;
