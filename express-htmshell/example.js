import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { expressHtmshell } from "express-htmshell";

const app = express();
const server = createServer(app);

const wss = new WebSocketServer({ noServer: true });

expressHtmshell("bash")(wss);

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