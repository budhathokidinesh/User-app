import express from "express";
const app = express();
const PORT = 8000;

import path from "path";
const __dirname = path.resolve();
console.log(__dirname, "===");
// app.get("/", (req, res, next) => {
//   console.log(next);
//   console.log("We got the request");
//   res.send(
//     "<h1>Hellow Dinesh budhathoki</h1> <hr/><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste neque eligendi blanditiis, atque dolores dolorem ab? Exercitationem laboriosam neque amet natus eligendi repudiandae nostrum commodi quae soluta tenetur, deserunt hic.</p>"
//   );
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/html/index.html");
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(` server is running at http://localhost:${PORT}`);
});
