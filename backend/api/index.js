const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('../src/queries');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.get("/api", (req, res) => {
    res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/api/entries-by-date", db.getEntriesByDate);
app.post("/api/add-entry", db.addEntry);
app.put("/api/update-entry", db.updateEntry);
app.delete("/api/delete-entry", db.deleteEntry);

app.post("/api/login", db.login);

app.get("/api/analytics/month", db.getAnalyticsByMonth);
app.get("/api/analytics/year", db.getYearlyAnalytics);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));