const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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
app.use(cors());

app.get("/", (req, res) => {
    res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/entries-by-date", db.getEntriesByDate);
app.post("/add-entry", db.addEntry);
app.put("/update-entry", db.updateEntry);
app.delete("/delete-entry", db.deleteEntry);

app.post("/login", db.login);

app.get("/analytics/month", db.getAnalyticsByMonth);
app.get("/analytics/year", db.getYearlyAnalytics);

app.listen(PORT, () => console.log("Server is listening!"));