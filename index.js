const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser"); // Add this for parsing JSON data

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json()); // Use bodyParser for JSON parsing

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/site.html");
});

app.post("/makeIt", (req, res) => {
  const htmlData = req.body.html;
  // Replace spaces with underscores
  const sanitizedHtml = htmlData.replace(/ /g, "_");
  const encodedHtml = encodeURIComponent(sanitizedHtml);

  // Process the sanitizedHtml and generate a URL as needed
  const generatedUrl = "http://localhost:3000/s?url=" + encodedHtml;

  res.json({ url: generatedUrl });
});

app.get("/s", (req, res) => {
  const encodedHtml = req.query.url;
  // Decode the URL and replace underscores with spaces
  const decodedHtml = decodeURIComponent(encodedHtml).replace(/_/g, " ");
  res.render("anysite", { url: decodedHtml });
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
