import http from "http";
import url from "url";
import fs from "fs/promises";

http.createServer((request, response) => {
    const path = url.parse(request.url, true).pathname;
    if (request.method === "GET") {
    }
    if (path === "/") {
        fs.readFile("./index.html")
            .then((data) => {
                response.writeHead(200, { "content-type": "text/html" });
                response.end(data, "utf8");
            })
            .catch((err) => {
                return console.error(err);
            });
    } else if (path === "/css/style.css") {
        fs.readFile("./css/style.css")
            .then((data) => {
                response.writeHead(200, { "content-type": "text/css" });
                response.end(data);
            })
            .catch((err) => {
                return console.error(err);
            });
    } else if (path.includes("/js/")) {
        fs.readFile(`.${path}`)
            .then((data) => {
                response.writeHead(200, {
                    "content-type": "Application/javascript",
                });
                response.end(data);
            })
            .catch((err) => {
                return console.error(err);
            });
    } else if (path.includes("/img/")) {
        fs.readFile(`.${path}`)
            .then((data) => {
                response.writeHead(200, {
                    "content-type": "image/jpeg	",
                });
                response.end(data);
            })
            .catch((err) => {
                return console.error(err);
            });
    } else {
        response.writeHead(404);
        response.end("Not Found");
    }
}).listen(3000);
