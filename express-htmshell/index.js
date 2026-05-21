import * as os from "node:os";
import * as pty from "node-pty";
import process from "node:process";

export function expressHtmshell(shell) {
    return (wss) => {
        wss.on("connection", (ws, req) => {
            const bash = pty.spawn(shell, [], {
                name: "xterm-256color",
                cols: 80,
                rows: 24,
                cwd: os.homedir(),
                env: process.env
            });

            ws.on("message", (data) => {
                bash.write(data.toString());
            });

            bash.onData((data) => {
                ws.send(data);
            });

            bash.onExit(() => {
                ws.close(1000);
            });
        });
    };
}