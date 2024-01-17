const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const connect = mysql.createConnection({
  host: "localhost",
  user: "cicd-user",
  password: "pass1234",
  database: "cicd",
});
connect.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/users", (req, res) => {
  const { name } = req.query;
  console.log(name);
  connect.query(
    `SELECT * FROM users WHERE username = '${name}'`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.listen(3000, () => {
  console.log(" listening on port 3000!");
});
