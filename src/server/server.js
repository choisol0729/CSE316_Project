import express from "express";
import * as mysql from "mysql2";

const port = 2424;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MAX_VALUE = 10000000

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
    const id = parseInt((Math.random() * MAX_VALUE).toPrecision(16));

    const sqlQuery = "INSERT INTO Contents(id, title, content, category, userID, url) VALUES (?, ?, ?, ?, ?, ?);"

    db.query(sqlQuery, [id, title, content, category, userID, url], (err, result) => {
        if(err) console.log(err);
        res.send({id: id, success: true});
    })
});

app.post("/deletePost", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const postID = req.query["postID"];
    const userID = req.query["userID"];

    console.log(postID, userID);

    const sqlQuery = "DELETE FROM Contents WHERE id = " + postID + " AND userID = '" + userID + "';";

    db.query(sqlQuery, (err, result) => {
        if(result.affectedRows == 0) res.send({id: postID, success: false});
        else res.send({id: postID, success: true});
    })
})

app.post("/postComments", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var dateObj = new Date();

    const id = parseInt((Math.random() * MAX_VALUE).toPrecision(16));
    var comment = req.query["comment"];
    var postID = req.query["postID"];
    var date = dateObj.getFullYear() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getDate();

    const sqlQuery = "INSERT INTO Comments(id, comment, postID, creationDate) VALUES (?, ?, ?, ?);";

    db.query(sqlQuery, [id, comment, postID, date], (err, result) => {
        if(err) console.log(err);
        res.send(result);
    })
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

app.get("/getContent", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var id = req.query["id"];

    const sqlQuery = "SELECT * FROM Contents WHERE id = " + id + ";";

    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send(result[0]);
    })
})

app.get("/getAllContents", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const sqlQuery = "SELECT * FROM Contents;";

    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err);
        res.send(result);
    })
})

app.get("/getCategoryContents", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var category = req.query["category"];

    const sqlQuery = "SELECT * FROM Contents WHERE category = '" + category + "';";

    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send(result);
    })
})

app.get("/getCommentByPosts", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    var id = req.query["postID"];

    const sqlQuery = "SELECT * FROM Comments WHERE postID = '" + id + "';";

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
