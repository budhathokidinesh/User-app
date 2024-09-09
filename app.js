import express from "express";
const app = express();
const PORT = 8000;

import path from "path";
import fs from "fs";
import { error } from "console";
import { send } from "process";
import { isUtf8 } from "buffer";
import { makeHtmlString } from "./src/html/fileMerger.js";
const __dirname = path.resolve();
console.log(__dirname, "===");
//serve static file from the public directory

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
// Home page controller
// app.get("/", (req, res, next) => {
//   console.log(next);
//   console.log("We got the request");
//   res.send(
//     "<h1>Hellow Dinesh budhathoki</h1> <hr/><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste neque eligendi blanditiis, atque dolores dolorem ab? Exercitationem laboriosam neque amet natus eligendi repudiandae nostrum commodi quae soluta tenetur, deserunt hic.</p>"
//   );
// });

// Home page controller
app.get("/", (req, res) => {
  //Read the text base file
  fs.readFile(fileName, "Utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/src/html/index.html");
    } else console.log();
    res.send(makeHtmlString(data.split("\n")));
  });
});

// User registration controller
const fileName = "userList.csv";
app.get("/registration", (req, res) => {
  console.log(req.body);

  res.sendFile(__dirname + "/src/html/registration.html");
});
app.post("/registration", (req, res) => {
  const { name, email, password } = req.body;

  const str = `${name},${email},${password}\n`;
  console.log(str);

  // create file and write data
  fs.appendFile(fileName, str, (error) => {
    error ? res.send(error.message) : res.redirect("/");
    // : res.send(
    //     `<h1 class = "alert alert-success">User has been created, you may login now.</h1>`
    //   );
  });

  // console.log("req recieved registration");
  res.sendFile(__dirname + "/src/html/registration.html");
});

// User login AbortController

app.get("/login", (req, res) => {
  console.log("req recieved login");
  res.sendFile(__dirname + "/src/html/login.html");
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = email + "," + password;
  // Read data from file
  fs.readFile(fileName, "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.send("<h1>There was an error processing your request</h1>");
    } else {
      const person = data.split("\n").find((user) => user.includes(str));
      person?.length
        ? res.send(
            `<h1>Hey ${
              person.split(",")[0]
            }, You have successfully logedin</h1>`
          )
        : res.send(`<h1>Error, Invalid login details</h1>`);
    }
  });
});

// app.get("/get-user", (req, res) => {
//   res.json({
//     fName: "Dinesh",
//     lName: "Budhathoki",
//   });
// });

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(` server is running at http://localhost:${PORT}`);
});
