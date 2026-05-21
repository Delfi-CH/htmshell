# svelte-htmshell

svelte components for htmshell

[View on NPM](https://www.npmjs.com/package/svelte-htmshell)

## Installation

```sh
npm install svelte-htmshell
```

## Example

```svelte
<script>
    import Terminal from "svelte-htmshell";
</script>

<Terminal url="ws://localhost:3000/shell" ></Terminal>
<Terminal url="ws://localhost:3000/shell" binary="fish" rows={40} cols={120} onClose={()=>alert("Terminal closed!")}></Terminal>
```