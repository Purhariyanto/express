const express = require("express");

const app = express();

app.get("/q/:q", (req, res) => {
  const fs = require('fs');
  const tag = "| # |";
  const q = req.params.q

  const readStream = fs.createReadStream('/tmp/q.txt')
  readStream.on('open', function () {
    readStream.pipe(res)
  })

  readStream.on('error', function (err) {
    res.end(err)
  })

  try {
    fs.writeFileSync('./q.txt', "ok");
    console.log(1);
  } catch (err) {
    return
  }

  
  res.send(req.params.q);
}),
app.get("/get", (_, res) => {
  const fs = require('fs');

  fs.readFile('./q.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
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
