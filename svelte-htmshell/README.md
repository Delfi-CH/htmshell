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
    import DynamicTerminal from "$lib/DynamicTerminal.svelte";
    import Terminal from "$lib/Terminal.svelte";
</script>

<Terminal url="ws://localhost:3000/shell" binary="fish" rows={40} cols={120} onClose={()=>alert("Terminal closed!")}></Terminal>
<DynamicTerminal url="ws://localhost:3000/shell" binary="fish"></DynamicTerminal>
```

## Build it yourself

```sh
git clone https://github.com/Delfi-CH/htmshell.git
cd htmshell/svelte-htmshell
pnpm install
pnpm package
```