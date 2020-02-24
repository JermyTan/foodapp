const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.end("Welcome to foodapp!"));

app.listen(port, () => console.log(`server listening on port ${port}`));
