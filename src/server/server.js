import express from "express";
import * as mysql from "mysql2";

const port = 2424;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Decompiler_DB",
});

// 더미 계정 데이터
const dummyUsers = [
    { acc: "sol", pwd: "choi" },
    { acc: "hae", pwd: "zou" }
];

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
    });
});

app.post("/postContents/:acc", (req, res) => {
    const acc = req.params.acc;
    // 더미 콘텐츠 반환 (예시)
    res.send({ message: `Contents for ${acc}` });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@ GET METHOD @@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var acc = req.query["acc"];
    var pwd = req.query["pwd"];
    const sqlQuery = "SELECT * FROM Users WHERE acc = " + acc + " AND pwd = " + pwd;

    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err);
        console.log(result);
    })
})



db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(port, () => {
    console.log("Listening on Port " + port + "...");
});
