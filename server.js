const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config({ path: "config/.env" });
app.use(express.json());
let port = process.env.PORT;
let uri = process.env.URI;

//connect to db
mongoose.connect(
  process.env.URI
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("connected to database");
  }
);

// Create and save users
// const instanceUser = new User({
//     Name: "zied",
//     Email: "zmedini16@gmail.com",
//     phone: 93794807,
//     age: 23,
// });
// instanceUser.save((err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// User.create([
//     { Name: "aziz", Email: "aziz@gmail.com", phone: 550235197, age: 25},
//     { Name: "wasime", Email: "wasime@gmail.com", phone: 2969987, age: 23 },
//     { Name: "mohamed", Email: "mohamed@gmail.com", phone: 23259623, age: 20 },
//     { Name: "salim", Email: "salim@gmail.com", phone: 20004025, age: 22  },
// ]);

//HOME PAGE
app.get("/", (req, res) => {
  res.send("WELCOME TO MY APP");
});

//   GET :  RETURN ALL USERS
app.get("/users", (req, res) => {
  User.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// POST :  ADD A NEW USER TO THE DATABASE
app.post("/add-user", (req, res) => {
  let newUser = req.body;
  User.create([newUser])
    .then((result) => res.send(result))
    .catch((err) => console.log("err", err));
});

// PUT : EDIT A USER BY ID
app.put("/edit-user/:id", (req, res) => {
  let userID = req.params.id;
  let body = req.body;
  User.updateOne({ _id: userID }, { $set: body }, { strict: true }, (err) => {
    if (err) throw err;
  })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// DELETE : REMOVE A USER BY ID
app.delete("/delete-user/:id", (req, res) => {
  let userID = req.params.id;
  console.log(typeof userID);
  User.remove({ _id: userID }, (err) => {
    if (err) throw err;
  })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`connected to http://localhost:${port}`);
});