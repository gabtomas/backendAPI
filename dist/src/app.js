"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const app = (0, express_1.default)();
const PORT = 3000;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create the connection to the database
const connection = mysql2_1.default.createConnection(process.env.DATABASE_URL || "");
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/sql", (req, res) => {
    const query = "SELECT * FROM Characters";
    connection.query(query, (err, results, fields) => {
        if (err)
            throw err;
        res.json(results);
    });
});
app.get("/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM Characters WHERE id = ?";
    connection.query(query, [id], (err, results, fields) => {
        if (err)
            throw err;
        res.json(results);
    });
});
app.listen(3000, () => {
    console.log(`Server running on porte ${PORT}`);
});
exports.default = app;
