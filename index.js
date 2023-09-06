const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.get("/q/:q", (req, res) => {
  

  const file = fs.createWriteStream("./q.txt");
  file.write("hello, ");
  file.end("world!");

  res.send(req.params.q);
}),
  app.get("/get", (_, res) => {
    const file = path.join(process.cwd(), "test.json");
    const stringified = fs.readFileSync(file, "utf8");

    res.setHeader("Content-Type", "application/json");
    return res.end(stringified);
  });

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
