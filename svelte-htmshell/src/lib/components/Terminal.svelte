<script lang="ts">
    import { onMount } from "svelte";
    import "@xterm/xterm/css/xterm.css"

    let { url, binary = "sh" } = $props();

    let wsInitialised = $state(false);

    onMount(async () => {
        const { Terminal } = await import("@xterm/xterm")
        const ws = new WebSocket(url + binary)
        const term = new Terminal();
        const termHtml = document.getElementById("terminal");

        if (!(termHtml === null)) {
            term.open(termHtml);
        }   

        ws.addEventListener("open", (e) => {
            wsInitialised = true;
        });

        ws.addEventListener("message", (e) => {
            term.write(e.data);
        });

        term.onData((data) => {
            ws.send(data);
        });

        ws.addEventListener("close", (e)=>{
            term.clear()
            term.write("Connection closed.")
        })
    });
</script>

<div id="terminal"></div>
