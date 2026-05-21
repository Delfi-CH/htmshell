# express-htmshell

expressjs middleware for htmshell

[View on NPM](https://www.npmjs.com/package/express-htmshell)

## Installation

```sh
npm install express-htmshell
```

## Example

```js
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { expressHtmshell } from "express-htmshell";

const app = express();
const server = createServer(app);

const wss = new WebSocketServer({ noServer: true });

expressHtmshell()(wss);

server.on("upgrade", (req, socket, head) => {
    if (req.url.startsWith("/shell")) {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    } else {
        socket.destroy();
    }
});

server.listen(3000, () => console.log("listening on port 3000"));
```
