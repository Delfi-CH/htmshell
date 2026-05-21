import express from "express";
import { createServer } from "http";
import { setupHtmshell } from "./index.js";

const app = express();
const server = createServer(app);

setupHtmshell(server, "/shell");

server.listen(3000, () => {
    console.log("listening on port 3000");
});