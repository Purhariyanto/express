const express = require("express");

const app = express();

app.get("/q/:q", (req, res) => {
  const fs = require('fs');
  const tag = "| # |";
  const q = req.params.q

  fs.readFile('src/server/q.txt', 'utf8', (err: any, data: any) => {
    if (err) {
      console.error(err);
      return;
    }
    const code = data.split(tag)
    let txt = code[1]+tag+code[2]+tag+code[3]+tag+code[4]+tag+code[5]+tag+code[6]+tag+code[7]+tag+code[8]+tag+code[9]+tag+code[10]+tag+code[11]+tag+code[12]+tag+code[13]+tag+code[14]+tag+code[15]+tag+code[16]+tag+code[17]+tag+code[18]+tag+code[19]+tag+code[20]+tag
    txt += q
    try {
      fs.writeFileSync('src/server/q.txt', txt);
    } catch (err) {
      return
    }
  });

  
  res.send(req.params.q);
}),
app.get("/get", (_, res) => {
  const fs = require('fs');

  fs.readFile('src/server/q.txt', 'utf8', (err: any, data: any) => {
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
