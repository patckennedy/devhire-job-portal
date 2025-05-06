const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// POST /api/jobs - create a job
router.post('/', (req, res) => {
    const {
        title,
        description,
        requirements,
        location,
        job_type,
        company_name,
        salary,
        job_status,
        application_link,
        company_logo,
        recruiter_id,
    } = req.body;

    const sqlText = `
        INSERT INTO "jobs"
        (title, description, requirements, location, job_type, company_name, salary, job_status, application_link, company_logo, recruiter_id)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
    `;

    const sqlValues = [
        title,
        description,
        requirements,
        location,
        job_type,
        company_name,
        salary,
        job_status,
        application_link,
        company_logo,
        recruiter_id,
    ];
    console.log('Job Data Received:', sqlValues);
    console.log('Job POST payload:', req.body);

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.status(201).json(dbRes.rows[0]);
        })

        .catch((err) => {
            console.error('Error creating job:', err.message);
            res.status(500).json({ error: err.message });
        });
});

// // GET /api/jobs/recruiter/:id - fetch jobs by recruiter ID
// router.get('/recruiter/:id', (req, res) => {
//     const recruiterId = req.params.id;

//     const sqlText = `
//         SELECT * FROM jobs
//         WHERE recruiter_id = $1
//         ORDER BY id DESC;
//     `;

//     pool.query(sqlText, [recruiterId])
//         .then((result) => {
//             res.json(result.rows);
//         })
//         .catch((err) => {
//             console.error('Error fetching recruiter jobs:', err);
//             res.sendStatus(500);
//         });
// });

// router.get('/recruiter/:id', (req, res) => {
//     const recruiterId = req.params.id;

//     const sqlText = `
//         SELECT
//             jobs.*,
//             COUNT(applications.id) AS applications
//         FROM jobs
//         LEFT JOIN applications ON applications.job_id = jobs.id
//         WHERE jobs.recruiter_id = $1
//         GROUP BY jobs.id
//         ORDER BY jobs.id DESC;
//     `;

//     pool.query(sqlText, [recruiterId])
//         .then((result) => {
//             res.json(result.rows);
//         })
//         .catch((err) => {
//             console.error('Error fetching recruiter jobs:', err);
//             res.sendStatus(500);
//         });
// });

// GET /api/jobs/recruiter/:id - fetch jobs by recruiter ID
router.get('/recruiter/:id', (req, res) => {
    const recruiterId = req.params.id;

    const sqlText = `
        SELECT 
            j.*, 
            COUNT(a.id)::INT AS applications
        FROM jobs j
        LEFT JOIN applications a ON j.id = a.job_id
        WHERE j.recruiter_id = $1
        GROUP BY j.id
        ORDER BY j.id DESC;
    `;

    pool.query(sqlText, [recruiterId])
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.error('Error fetching recruiter jobs:', err);
            res.sendStatus(500);
        });
});

// GET /api/jobs - fetch all jobs (for job seekers)
router.get('/', (req, res) => {
    const sqlText = `
        SELECT * FROM jobs
        ORDER BY id DESC;
    `;

    pool.query(sqlText)
        .then((result) => res.json(result.rows))
        .catch((err) => {
            console.error('Error fetching jobs:', err);
            res.sendStatus(500);
        });
});
// GET /api/jobs/:id - fetch a single job by ID
router.get('/:id', (req, res) => {
    const jobId = req.params.id;

    const sqlText = `
        SELECT * FROM jobs
        WHERE id = $1;
    `;

    pool.query(sqlText, [jobId])
        .then((result) => {
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Job not found' });
            }
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.error('Error fetching job by ID:', err);
            res.sendStatus(500);
        });
});

// PUT /api/jobs/:id/status - update job status
router.put('/:id/status', (req, res) => {
    const jobId = req.params.id;
    const { job_status } = req.body;

    const sqlText = `
        UPDATE jobs
        SET job_status = $1
        WHERE id = $2
        RETURNING *;
    `;

    pool.query(sqlText, [job_status, jobId])
        .then((result) => {
            res.status(200).json(result.rows[0]);
        })
        .catch((err) => {
            console.error('Error updating job status:', err);
            res.sendStatus(500);
        });
});

// PUT /api/jobs/:id - update full job details
router.put('/:id', (req, res) => {
    const jobId = req.params.id;
    const {
        title,
        description,
        requirements,
        location,
        job_type,
        company_name,
        salary,
        job_status,
        application_link,
        company_logo,
    } = req.body;

    const sqlText = `
        UPDATE jobs
        SET title = $1,
            description = $2,
            requirements = $3,
            location = $4,
            job_type = $5,
            company_name = $6,
            salary = $7,
            job_status = $8,
            application_link = $9,
            company_logo = $10
        WHERE id = $11
        RETURNING *;
    `;

    const sqlValues = [
        title,
        description,
        requirements,
        location,
        job_type,
        company_name,
        salary,
        job_status,
        application_link,
        company_logo,
        jobId,
    ];

    pool.query(sqlText, sqlValues)
        .then((result) => res.status(200).json(result.rows[0]))
        .catch((err) => {
            console.error('Error updating full job:', err);
            res.status(500).json({ error: 'Failed to update job.' });
        });
});

// DELETE /api/jobs/:id - delete a job ----------------------------
router.delete('/:id', (req, res) => {
    const jobId = req.params.id;

    const sqlText = `
        DELETE FROM jobs
        WHERE id = $1;
    `;

    pool.query(sqlText, [jobId])
        .then(() => res.sendStatus(204))
        .catch((err) => {
            console.error('Error deleting job:', err);
            res.sendStatus(500);
        });
});

router.patch('/:id/status', (req, res) => {
    const jobId = req.params.id;
    const { job_status } = req.body;

    const sqlText = `
        UPDATE jobs
        SET job_status = $1
        WHERE id = $2;
    `;

    pool.query(sqlText, [job_status, jobId])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.error('Error updating job status:', err);
            res.sendStatus(500);
        });
});

module.exports = router;
