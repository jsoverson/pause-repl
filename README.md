# pause-repl

Function that opens a node.js REPL and returns a promise that resolves only when `unpause()` is called in the REPL.

When you `await` for this function to return, it will pause a script and open an interactive session.

## Installation

```shell
$ npm install pause-repl
```

## Usage

Import the `pause` function from `pause-repl`.

```js
const { pause } = require('pause-repl');
```

`await pause()` from an `async` function to open a REPL.

```js
await pause();
```

Pass any object to `pause()` to expose its properties to the REPL.

```js
await pause({ hello: 'world' });
```

While `pause()` returns a promise and is intended to be used in an `async/await` context but it can be used like any other promise. The `unpause()` function is attached to the promise so you can unpause programmatically, like in a timeout or when another action completes.

```js
const pausedRepl = await pause();
pausedRepl.then(() => {
  console.log('unpaused');
});
pausedRepl.unpause();
```

## Example

```js
const { pause } = require('pause-repl');

(async () => {
  const replContext = {
    greet: () => 'Hello you!', // greet() will be availble in the REPL
  };

  await pause(replContext);

  // the script won't continue until unpaused()-ed from the REPL.
  console.log('Done');
})();
```

### Screenshot

![Screenshot showing REPL output](/screenshot.png?raw=true 'Screenshot showing REPL output')
