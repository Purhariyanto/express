const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.get("/q/:q", (req, res) => {
  

  // const file = fs.createWriteStream("/tmp/test.json");
  // file.write(req.params.q);
  const file = path.join(process.cwd(), "test.json");
  fs.writeFileSync(file, req.params.q);
  res.send(req.params.q);
}),
  app.get("/get", (_, res) => {
    const file = path.join(process.cwd(), "test.json");
    const stringified = fs.readFileSync(file, "utf8");

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(stringified);
  });

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
