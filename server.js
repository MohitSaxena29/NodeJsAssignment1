const http = require("http");
const fs = require("fs");
const port = 8080;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    if (req.method === "GET") {
      fs.readFile("text.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          let jsonData= JSON.parse(data);;
          const obj = {
            ...jsonData
          };

          fs.writeFile("data.txt", JSON.stringify(obj), "utf8", (err) => {
            if (err) {
              console.error(err);
              res.statusCode = 500;
              res.end("Internal Server Error");
            } else {
              let html = `<html>
                <head>
                  <style>
                    body {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                      font-family: Arial, sans-serif;
                    }

                    ul {
                      list-style: none;
                      padding: 0;
                    }

                    li {
                      margin-bottom: 10px;
                    }
                  </style>
                </head>
                <body>
                  <ul>`;
              const objKeys = Object.keys(obj);
              for (let i = 0; i < objKeys.length; i++) {
                const key = objKeys[i];
                html += `<li>${key}: ${obj[key]}</li>`;
              }
              html += `</ul>
                </body>
              </html>`;
              res.setHeader("Content-Type", "text/html");
              res.end(html);
            }
          });
        }
      });
    } else {
      res.statusCode = 405;
      res.end("error");
    }
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server is successfully running at http://localhost:${port}/`);
});