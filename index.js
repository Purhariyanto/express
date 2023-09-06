const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const file = "/tmp/test.json";

app.get("/", (req, res) => {
  res.send("Hello");
}),
  app.get("/q/:q", (req, res) => {
    const tag = "| # |";
    const q = req.params.q;
    const data = "ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok1| # |ok2"
    const code = data.split(tag);
    let txt =
      code[1] +
      tag +
      code[2] +
      tag +
      code[3] +
      tag +
      code[4] +
      tag +
      code[5] +
      tag +
      code[6] +
      tag +
      code[7] +
      tag +
      code[8] +
      tag +
      code[9] +
      tag +
      code[10] +
      tag +
      code[11] +
      tag +
      code[12] +
      tag +
      code[13] +
      tag +
      code[14] +
      tag +
      code[15] +
      tag +
      code[16] +
      tag +
      code[17] +
      tag +
      code[18] +
      tag +
      code[19] +
      tag +
      code[20] +
      tag;
    txt += q;
    fs.writeFileSync(file, txt);
    res.send(q);
  }),
  app.get("/get", (_, res) => {
    const stringified = fs.readFileSync(file, "utf8");

    res.setHeader("Content-Type", "text/plain");
    return res.end(stringified);
  });

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
