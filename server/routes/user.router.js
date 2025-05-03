const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// GET: fetch current user session info
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.send({});
    }
});

// POST: register new user
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = encryptLib.encryptPassword(password);

    const sqlText = `
        INSERT INTO "user" (username, password, role)
        VALUES ($1, $2, $3);
    `;

    pool.query(sqlText, [username, hashedPassword, role])
        .then(() => res.sendStatus(201))
        .catch((dbErr) => {
            console.log('POST /api/user/register error:', dbErr);
            res.sendStatus(500);
        });
});

//NEW: POST /api/user/login
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

// Add this to handle user login after registration
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200); // Login successful
});

// POST: logout
router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.sendStatus(200);
    });
});



module.exports = router;
