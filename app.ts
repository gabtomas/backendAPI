import express, { Request, Response } from "express";
import mysql from "mysql2";

const app = express();
const PORT = 3000;

import dotenv from "dotenv";
dotenv.config();

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL || "");

// simple query
connection.query("show tables", function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra metadata about results, if available
});

// Example with placeholders
connection.query(
    "select 1 from dual where ? = ?",
    [1, 1],
    function (err, results) {
        console.log(results);
    }
);

connection.end();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello wWoreld");
});

app.get("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    res.json({ id });
});

app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
});
