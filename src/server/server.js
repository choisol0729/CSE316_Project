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
    console.log(`Login attempt with acc: ${acc} and pwd: ${pwd}`);

    // 더미 계정 확인
    const dummyUser = dummyUsers.find(user => user.acc === acc && user.pwd === pwd);
    if (dummyUser) {
        res.send({ message: "로그인 성공 (더미 계정)!" });
        return;
    }

    // 데이터베이스 조회
    const sqlQuery = "SELECT * FROM Users WHERE acc = ? AND pwd = ?";
    db.query(sqlQuery, [acc, pwd], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "서버 오류" });
        } else if (result.length > 0) {
            res.send({ message: "로그인 성공!" });
        } else {
            res.status(401).send({ message: "로그인 실패: 계정 정보가 잘못되었습니다." });
        }
    });
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(port, () => {
    console.log("Listening on Port " + port + "...");
});
