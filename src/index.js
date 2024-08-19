let http = require("http");
let url = require("url");
let fs = require("fs");

http
  .createServer(function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    let filename = "." + parsedUrl.pathname + ".html";
    if (filename === "./.html") filename = "./index.html"; // Default to index.html

    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile("./404.html", function (error, notFoundData) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(notFoundData);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
