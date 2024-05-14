import express from "express"
import * as mysql from "mysql2"

const port = 2424
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Decompiler_DB",
});

// @@@@@@@@@@@@@@@@@@@@@@@@ POST METHOD @@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post("/signUp", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "INSERT INTO Users(acc, pwd, postID, creationDate) VALUES (?, ?, ?, ?);";
    
    var date = new Date();
    var username = req.query["username"];
    var pwd = req.query["pwd"];
    var cDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    db.query(sqlQuery, [username, pwd, "", cDate], (err, result) => {
        if(err) console.log(err);
        res.send(result);
    })
})

app.post("/postContents/:acc", (req, res) => {
    const acc = req.params.acc;
})

// @@@@@@@@@@@@@@@@@@@@@@@@@ GET METHOD @@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var acc = req.query["acc"];
    var pwd = req.query["pwd"];
    const sqlQuery = "SELECT * FROM Users WHERE acc = ? AND pwd = ?;";

    db.query(sqlQuery, [acc, pwd], (err, result) => {
        if(err) console.log(err);
        console.log(result[0]);

        res.send(result[0]);
    })
})

db.connect((err) => {
    if(err) throw err;
    console.log("Connected!")
})

app.listen(port)
console.log("Listening on Port " + port + "...")