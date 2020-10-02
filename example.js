/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pause } = require('.');

(async () => {
  const myContext = {
    greet: () => 'Hello you!',
  };
  await pause(myContext);
  // the script won't continue until unpaused()-ed from the REPL.
  console.log('Done');
})();
