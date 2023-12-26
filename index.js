const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("Hello");
}),
  app.get("/rss.xml", (_, res) => {

    function getCurrentDate() {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
      const currentDate = new Date();
      const dayOfWeek = daysOfWeek[currentDate.getUTCDay()];
      const dayOfMonth = currentDate.getUTCDate();
      const month = months[currentDate.getUTCMonth()];
      const year = currentDate.getUTCFullYear();
      const hours = currentDate.getUTCHours();
      const minutes = currentDate.getUTCMinutes();
      const seconds = currentDate.getUTCSeconds();
    
      return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
    }

    function Crop(awal, akhir, text) {
      text = text.split(awal);
      text = text[1].split(akhir);
      text = text[0];
      return text;
    }

    function CleanURL(title) {
      const string = title.replace(/[^A-Za-z0-9- ]/g, "").trim()
      const str = string.replace(/[\s-]+/g, "-")
    
      return str.toLowerCase()
    }

    async function list() {
      const url = await fetch(`https://vww.lagu123.fun`);
      const crop = Crop(
        '<h2 class="ht">Download Lagu Gratis</h2>',
        "</div></div>",
        await url.text()
      );
      let isi = ""

      const link = `https://lagubebassmp3.netlify.app`
      const listArray = crop.split('title="')
      listArray && listArray.length > 0 && listArray.map((i, n) => {
        if (n === 0) return null
        ok = i.split('">')[0]
        const link1 = `${link}/m/${CleanURL(ok.replace("Download musik ", ""))}.html`
        isi += `<item>
        <title>
        <![CDATA[ ${ok} ]]>
        </title>
        <description>
        <![CDATA[ Download lagu ${ok.replace("Download musik ", "")} (${Math.floor(Math.random() * (10 - 5.5)) + 5.5} MB) dan Streaming Kumpulan Lagu ${ok.replace("Download musik ", "")} Terbaru di Lagubebass. ]]>
        </description>
        <link>${link1}</link>
        <guid isPermaLink="true">${link1}</guid>
        <pubDate>${getCurrentDate()}</pubDate>
        <content:encoded>
<![CDATA[ <figure><img src="https://wappur1.netlify.app/icons/icon-512x512.png" /></figure><p>Download ${ok.replace("Download musik ", "")} mp3, fast and easy ~ ${ok.replace("Download musik ", "")} song and listen to ${ok.replace("Download musik ", "")} popular song on MP3 Music Download.</p> ]]>
</content:encoded>
        </item>`
      })

      const head = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <script/>
      <channel>
      <title>
      <![CDATA[ Lagubebass RSS Feed ]]>
      </title>
      <description>
      <![CDATA[ Lagubebass adalah situs download lagu gratis, gudang lagu Mp3 indonesia, lagu barat terbaik. Download lagu 123 terbaru mp3 - mudah, cepat, nyaman. ]]>
      </description>
      <link>${link}</link>
      <generator>GatsbyJS</generator>
      <lastBuildDate>${getCurrentDate()}</lastBuildDate>`
      
      const foot = `</channel></rss>`

      res.setHeader("Content-Type", "application/xml");

      return res.send(head+isi+foot);
    }
    list()
  });

app.listen(8000, () => {
  console.log("Running on port 8000.");
});

// Export the Express API
module.exports = app;