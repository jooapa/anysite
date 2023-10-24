const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const compression = require("compression");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/site.html");
});

app.post("/makeIt", (req, res) => {
  const htmlData = req.body.html;
  const sanitizedHtml = htmlData.replace(/ /g, "_");
  const compressedHtml = compress(sanitizedHtml); // Compress the HTML data

  const generatedUrl =
    req.headers.referer + "s?url=" + encodeURIComponent(compressedHtml);

  res.json({ url: generatedUrl });
});

app.post("/lookUrl", (req, res) => {
  const url = req.body.url;
  const decodedHtml = decodeURIComponent(url);

  // Remove the current domain and "/s?url=" from the URL
  const urlWithoutDomain = decodedHtml.replace(/^.*\/s\?url=/, "");

  const decompressedHtml = deCompress(urlWithoutDomain);
  const uriDecodedHtml = decodeURIComponent(decompressedHtml);
  const sanitizedHtml = uriDecodedHtml.replace(/_/g, " ");
  res.json({ url: sanitizedHtml });
});


app.get("/s", (req, res) => {
  const url = req.query.url;
  const decodedHtml = decodeURIComponent(url);
  const decompressedHtml = deCompress(decodedHtml);
  const uriDecodedHtml = decodeURIComponent(decompressedHtml);
  const sanitizedHtml = uriDecodedHtml.replace(/_/g, " ");
  res.render("anysite", { url: sanitizedHtml });
});

const compress = (data) => {
  // use the best compression
  const compressedData = compression.compress(data, "best");
  return compressedData;
}

const deCompress = (data) => {
  // use the best compression
  const decompressedData = compression.decompress(data, "best");
  return decompressedData;
}

app.use(express.static("public"));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
