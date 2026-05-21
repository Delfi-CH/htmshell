<script lang="ts">
    import Terminal from "$lib/components/Terminal.svelte";  
</script>

<Terminal url="http://localhost:3000/shell" ></Terminal>
<Terminal url="http://localhost:3000/shell" binary="fish" rows={40} cols={120} onClose={()=>alert("Terminal closed!")}></Terminal>