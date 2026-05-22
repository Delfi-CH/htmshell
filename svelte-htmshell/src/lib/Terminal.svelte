<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import "@xterm/xterm/css/xterm.css";

    let {
        url,
        binary = "sh",
        rows = 24,
        cols = 80,
        onClose = () => null,
        args = []
    } = $props();

    let termHtml: HTMLDivElement;
    let cleanup = () => {};

    onMount(async () => {
        const { Terminal } = await import("@xterm/xterm");
        const argstring = args.length > 0 ? "&arg=" + args.join("&arg=") : ""
        const ws = new WebSocket(
            url + "?shell=" + binary + "&rows=" + rows + "&cols=" + cols + argstring,
        );
        const term = new Terminal({
            cursorBlink: true,
            cols: cols,
            rows: rows,
            cursorStyle: "bar",
        });
        if (!termHtml) {
            return
        }
        term.open(termHtml);

        ws.addEventListener("open", (e) => {
            term.clear();
        });

        ws.addEventListener("message", (e) => {
            term.write(e.data);
        });

        term.onData((data) => {
            ws.send(data);
        });

        ws.addEventListener("close", (e) => {
            term.clear();
            term.write("Connection closed.");
            onClose();
        });

        cleanup = () =>{
            term.dispose()
            ws.close()
        }
    });

    onDestroy(()=>{
        cleanup()
    })
</script>

<div>
    <div bind:this={termHtml}></div>
</div>
