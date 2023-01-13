import http from "http";
import url from "url";
import fs from "fs/promises";

function checkContentType(path) {
    if (path === "/") {
        return "text/html";
    } else if (path.includes("/css/")) {
        return "text/css";
    } else if (path.includes("/js/")) {
        return "Application/javascript";
    } else if (path.includes("/img/")) {
        return "image/jpeg";
    } else {
        return "";
    }
}

http.createServer((request, response) => {
    let path = url.parse(request.url, true).pathname;
    const contentType = checkContentType(path);
    if (request.method !== "GET" || contentType === "") {
        response.writeHead(404);
        response.end("Not Found");
    }
    fs.readFile(`.${path === "/" ? "/index.html" : path}`)
        .then((data) => {
            response.writeHead(200, {
                "content-type": contentType,
            });
            response.end(data);
        })
        .catch((err) => {
            return console.error(err);
        });
}).listen(3000);
