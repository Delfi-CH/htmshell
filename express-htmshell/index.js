import * as os from "node:os";
import * as pty from "node-pty";
import process from "node:process";
import { WebSocketServer } from "ws";
import { URL } from "node:url";

export function setupHtmshell(server, path) {
    const wss = new WebSocketServer({
        noServer: true
    });

    server.on("upgrade", (req, socket, head) => {
        const url = new URL(req.url, `http://${req.headers.host}`);

        if (url.pathname !== path) {
            socket.destroy();
            return;
        }

        const shell = url.searchParams.get("shell") || "bash";
        const rows = Number(url.searchParams.get("rows")) || 0;
        const cols = Number(url.searchParams.get("cols")) || 0;

        wss.handleUpgrade(req, socket, head, (ws) => {
            ws.shell = shell;
            ws.rows = rows;
            ws.cols = cols;

            wss.emit("connection", ws, req);
        });
    });

    wss.on("connection", (ws) => {
        spawnShell(ws);
    });
};

export function spawnShell(ws) {
    let options = {
        name: "xterm-256color",
        cwd: os.homedir(),
        env: process.env
    }

    if (ws.rows !== 0) {
        options.rows = ws.rows
    }

    if (ws.cols !== 0) {
        options.cols = ws.cols
    }

    const term = pty.spawn(ws.shell, [], options);


    ws.on("message", (data) => {
        try {
            const parsed = JSON.parse(data);

            if (parsed.type === "resize") {
                if (
                    Number.isInteger(parsed.cols) &&
                    Number.isInteger(parsed.rows) &&
                    parsed.cols > 0 &&
                    parsed.rows > 0
                ) {
                    term.resize(parsed.cols, parsed.rows);
                }

                return;
            }
        } catch { }

        term.write(data.toString());
    });

    term.onData((data) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(data);
        }
    });

    ws.on("close", () => {
        term.kill();
    });

    term.onExit(() => {
        ws.close();
    });
}