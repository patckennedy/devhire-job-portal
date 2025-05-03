const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET /api/states - Retrieve all states
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM states;`;
    pool.query(sqlText)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.error('Error fetching states', err);
            res.sendStatus(500);
        });
});

module.exports = router;
