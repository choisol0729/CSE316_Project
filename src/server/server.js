import express from "express"
import * as mysql from "mysql2"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Decompiler_DB",
});

