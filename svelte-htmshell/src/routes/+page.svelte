<script lang="ts">
    import DynamicTerminal from "$lib/DynamicTerminal.svelte";
    import Terminal from "$lib/Terminal.svelte";
</script>

<Terminal url="ws://localhost:3000/shell" binary="fish" rows={40} cols={120} onClose={()=>alert("Terminal closed!")}></Terminal>
<DynamicTerminal url="ws://localhost:3000/shell" binary="fish"></DynamicTerminal>