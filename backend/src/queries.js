const { response } = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// app.get("/entries-by-date", db.getEntriesByDate);
// app.post("/add-entry", db.addEntry);
// app.put("/update-entry", db.updateEntry);
// app.delete("/delete-entry", db.deleteEntry);

const getEntriesByDate = (req, res) => {
    const date = req.query.date;
    pool.query(`SELECT * FROM Entries WHERE Date=${date}`, (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const addEntry = (req, res) => {
    const { LiveWeight, CarcassWeight, DateAdded } = req.body;
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

module.exports = {
    getEntriesByDate,
    addEntry,
    updateEntry,
    deleteEntry,
}
