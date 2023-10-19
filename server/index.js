const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mysql = require("mysql");

const bcrypt = require("bcrypt"); // used for pasword hashing
const saltRounds = 10; // used for pasword hashing

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "logindb",
});

// identify the requests using get and post methods

// for testing purposes only
app.get("/test", (req, res) => {
  const sqlStatement =
    "INSERT INTO logininfo (firstName, lastName, email, password) VALUES ('alaya', 'gamlath', 'sample2@mail.com', 'password1234');";
  db.query(sqlStatement, (error, result) => {
    res.send("data inserted");
  });
});



app.post("/api/insert", (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  // hashing the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const sqlStatement =
    "INSERT INTO logininfo (firstName, lastName, email, password) VALUES (?,?,?,?);";
    db.query(
      sqlStatement,
      [firstName, lastName, email, hash], // instead of passing password directly to the databash we pass the password hash into the database
      (error, result) => {
        console.log(result);
        res.send(result);
      }
    );
  })
  
});


/* without using password hashing

app.post("/api/insert", (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const sqlStatement =
    "INSERT INTO logininfo (firstName, lastName, email, password) VALUES (?,?,?,?);";
  db.query(
    sqlStatement,
    [firstName, lastName, email, password],
    (error, result) => {
      console.log(result);
      res.send(result);
    }
  );
});



app.post("/api/signup", (req, res) => {
  //const studentId = req.body.studentId;
  //const studentName = req.body.studentName;
  //const studentDep = req.body.studentDep;
  
  const email = req.body.email;
  const password = req.body.password;

  const sqlStatement =
  "SELECT * FROM logininfo WHERE email = ? AND password = ?;";
  db.query(
    sqlStatement,
    [email, password],
    (error, result) => {
      if (error) {
        res.send(error);
      }
      else {
        if (result.length >0) {
          res.send(result);
        }
        else {
          res.send({message:"Wrong Combination"})
        }
      }
    }
  );
});

*/

app.post("/api/signup", (req, res) => {
  //const studentId = req.body.studentId;
  //const studentName = req.body.studentName;
  //const studentDep = req.body.studentDep;
  
  const email = req.body.email;
  const password = req.body.password;

  const sqlStatement =
  "SELECT * FROM logininfo WHERE email = ?";
  db.query(
    sqlStatement,
    email,
    (error, result) => {
      if (error) {
        res.send(error);
      }
      else {
        if (result.length >0) {
          // compare the password with selected results
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              res.send(result);
            }
            else {
              res.send({message: 'Wrong Password for the selected user'});
            }
          })
        }
        else {
          res.send({message:"Wrong Combination"})
        }
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
