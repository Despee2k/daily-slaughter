const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("HELLO WORLD!");
});

app.listen(PORT, () => console.log("Server is listening!"));