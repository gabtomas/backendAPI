import express, { Request, Response } from "express";
import mysql from "mysql2";

const app = express();
const PORT = 3000;

import dotenv from "dotenv";
dotenv.config();

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL || "");

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/sql", (req: Request, res: Response) => {
    const query = "SELECT * FROM Characters";
    connection.query(query, (err, results, fields) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const query = "SELECT * FROM Characters WHERE id = ?";
    connection.query(query, [id], (err, results, fields) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log(`Server running on porte ${PORT}`);
});

export default app;
