const express = require("express");

const app = express();

app.get("/q/:q", (req, res) => {
  const fs = require('fs');
  
  const file = fs.createWriteStream('./q.txt');
  file.write('hello, ');
  file.end('world!');
  
  res.send(req.params.q);
}),
app.get("/get", (_, res) => {
  const fs = require('fs');

  fs.readFileSync('./q.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
  });
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
