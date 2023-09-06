const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const file = path.join(process.cwd(), "test.json");

app.get("/", (req, res) => {
  res.send("Hello");
}),
app.get("/q/:q", (req, res) => {
  fs.writeFileSync(file, req.params.q);
  res.send(req.params.q);
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
