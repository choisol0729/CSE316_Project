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

// @@@@@@@@@@@@@@@@@@@@@@@@ POST METHOD @@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post("/signUp", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "INSERT INTO Users(acc, pwd, postID, creationDate) VALUES (?, ?, ?, ?);";
    
    var date = new Date();
    var username = req.query["username"];
    var pwd = req.query["pwd"];
    var cDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    console.log("Name: ", username, " Pwd: ", pwd);

    db.query(sqlQuery, [username, pwd, "", cDate], (err, result) => {
        if(err) {
            console.log(err);
            res.send(err);
        }
        res.send(result);
    });
});

app.post("/deleteAcc", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var username = req.query["acc"];
    console.log("Username: ", username);

    const sqlQuery = "DELETE FROM Users WHERE acc = ?;";

    db.query(sqlQuery, [username], (err, result) => {
        if(err) {
            console.log(err);
            res.send(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post("/postContents", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const userID = req.query["userID"];
    const title = req.query["title"];
    const content = req.query["content"];
    const category = req.query["category"];
    const url = req.query["url"];
    const id = parseInt((Math.random() * MAX_CELL_VALUE).toPrecision(16));

    sqlQuery = "INSERT INTO Contents(id, title, content, category, userID, url) VALUES (?, ?, ?, ?, ?, ?);"

    db.query(sqlQuery, [id, title, content, category, userID, url], (err, result) => {
        if(err) console.log(err);
        res.send(result, id);
    })
});

app.post("/post", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var formData = req.query["formdata"];
    console.log("Data:", formData);

    res.send(formData);
})

// @@@@@@@@@@@@@@@@@@@@@@@@@ GET METHOD @@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    var acc = req.query["acc"];
    var pwd = req.query["pwd"];

    console.log(acc, pwd);

    const sqlQuery = "SELECT * FROM Users WHERE acc = '" + acc + "' AND pwd = '" + pwd + "';";

    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send(result);
    })
})

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(port, () => {
    console.log("Listening on Port " + port + "...");
});
