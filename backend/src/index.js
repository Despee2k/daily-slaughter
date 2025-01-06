const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./queries');
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/entries-by-date", db.getEntriesByDate);
app.post("/add-entry", db.addEntry);
app.put("/update-entry", db.updateEntry);
app.delete("/delete-entry", db.deleteEntry);

app.listen(PORT, () => console.log("Server is listening!"));