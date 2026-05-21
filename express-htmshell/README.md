# express-htmshell

expressjs middleware for htmshell

[View on NPM](https://www.npmjs.com/package/express-htmshell)

## Installation

```sh
npm install express-htmshell
```

## Example

```js
import express from "express";
import { createServer } from "http";
import { setupHtmshell } from "express-htmshell";

const app = express();
const server = createServer(app);

setupHtmshell(server, "/shell");

server.listen(3000, () => {
    console.log("listening on port 3000");
});
```
