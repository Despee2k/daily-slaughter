const { response } = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const  bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const JWT_SECRET = process.env.JWT_SECRET;

const getEntriesByDate = (req, res) => {
    const date = req.query.DateAdded;

    pool.query(`SELECT * FROM "public"."Entries" WHERE "DateAdded" = $1`,
        [date],
        (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const addEntry = (req, res) => {
    const { LiveWeight, CarcassWeight, DateAdded } = req.body;
    if (!LiveWeight || !CarcassWeight || !DateAdded) {
        return res.status(400).send('All fields are required!');
    }

    let Classification;

    if(LiveWeight < 90) Classification = "Grower";
    else if (LiveWeight >= 90 && LiveWeight < 120) Classification = "Fattener";
    else Classification = "Culd";

    pool.query(`INSERT INTO "public"."Entries" ("LiveWeight", "CarcassWeight", "Classification", "DateAdded") VALUES ($1, $2, $3, $4)`,
        [LiveWeight, CarcassWeight, Classification, DateAdded],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(201).send('Entry Added!');
        }
    );
};

const updateEntry = (req, res) => {
    const id = req.query.id;
    const { LiveWeight, CarcassWeight } = req.body;

    pool.query(`UPDATE "public"."Entries" SET "LiveWeight" = $1, "CarcassWeight" = $2 WHERE "id" = $3`,
        [LiveWeight, CarcassWeight, id]
    )

    let Classification;

    if(LiveWeight < 90) Classification = "Grower";
    else if (LiveWeight >= 90 && LiveWeight < 120) Classification = "Fattener";
    else Classification = "Culd";

    pool.query(`UPDATE "public"."Entries" SET "Classification" = $1 WHERE "id" = $2`,
        [Classification, id],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).send('Entry Classification Modified!');
        }
    )
}

const deleteEntry = (req, res) => {
    const id = req.query.id;
    
    pool.query(`DELETE FROM "public"."Entries" WHERE "id" = ${id}`, 
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).send('Entry Deleted!');
        }
    )
}

const login = async (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).send('Username and password required!');
    }

    try {
        const query = `SELECT * FROM "public"."Users" WHERE "Username" = $1`;

        const result = await pool.query(query, [Username]);
        if (result.rows.length === 0) {
            return res.status(401).send('Invalid username or password!');
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password!');
        }

        const token = jwt.sign(
            { id: user.id, Username: user.Username },
            JWT_SECRET,
            { expiresIn: "4hr" }
        );

        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error!');
    }
};

const getAnalyticsByMonth = async (req, res) => {
    const { year, month } = req.query;

    try {
        const query = `
            SELECT 
                ("DateAdded" AT TIME ZONE 'Asia/Singapore')::date as "DateAdded",
                "Classification",
                AVG("LiveWeight") as "AvgLiveWeight",
                AVG("CarcassWeight") as "AvgCarcassWeight",
                COUNT(*) as "TotalCount"
            FROM "public"."Entries"
            WHERE 
                EXTRACT(YEAR FROM ("DateAdded" AT TIME ZONE 'Asia/Singapore')::date) = $1
                AND EXTRACT(MONTH FROM ("DateAdded" AT TIME ZONE 'Asia/Singapore')::date) = $2
            GROUP BY ("DateAdded" AT TIME ZONE 'Asia/Singapore')::date, "Classification"
            ORDER BY ("DateAdded" AT TIME ZONE 'Asia/Singapore')::date`;

        const results = await pool.query(query, [year, month]);

        const organizedData = {};
        results.rows.forEach(row => {
            const date = new Date(row.DateAdded).toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });
            if (!organizedData[date]) {
                organizedData[date] = {
                    Grower: { avgLW: 0, avgCW: 0, count: 0 },
                    Fattener: { avgLW: 0, avgCW: 0, count: 0 },
                    Culd: { avgLW: 0, avgCW: 0, count: 0 }
                };
            }
            organizedData[date][row.Classification] = {
                avgLW: parseFloat(row.AvgLiveWeight || 0).toFixed(2),
                avgCW: parseFloat(row.AvgCarcassWeight || 0).toFixed(2),
                count: parseInt(row.TotalCount || 0)
            };
        });

        res.status(200).json(organizedData);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const getYearlyAnalytics = async (req, res) => {
    const { year } = req.query;
    
    try {
        const query = `
            SELECT 
                EXTRACT(MONTH FROM "DateAdded"::date) as month,
                "Classification",
                AVG("LiveWeight") as "AvgLiveWeight",
                AVG("CarcassWeight") as "AvgCarcassWeight",
                COUNT(*) as "TotalCount"
            FROM "public"."Entries"
            WHERE EXTRACT(YEAR FROM "DateAdded"::date) = $1
            GROUP BY month, "Classification"
            ORDER BY month`;

        const results = await pool.query(query, [year]);
        
        const organizedData = {};
        results.rows.forEach(row => {
            const month = parseInt(row.month);
            if (!organizedData[month]) {
                organizedData[month] = {
                    Grower: { avgLW: 0, avgCW: 0, count: 0 },
                    Fattener: { avgLW: 0, avgCW: 0, count: 0 },
                    Culd: { avgLW: 0, avgCW: 0, count: 0 }
                };
            }
            organizedData[month][row.Classification] = {
                avgLW: parseFloat(row.AvgLiveWeight).toFixed(2),
                avgCW: parseFloat(row.AvgCarcassWeight).toFixed(2),
                count: parseInt(row.TotalCount)
            };
        });

        res.status(200).json(organizedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getEntriesByDate,
    addEntry,
    updateEntry,
    deleteEntry,
    login,
    getAnalyticsByMonth,
    getYearlyAnalytics,
}
