import path from 'path';
import repl, { REPLServer } from 'repl';
import { promisify } from 'util';

export type ReplPromise = Promise<void> & { repl: REPLServer; unpause: () => void };

export function pause(context: Record<string, any> = {}): ReplPromise {
  const replInstance = repl.start({
    prompt: '> ',
    output: process.stdout,
    input: process.stdin,
  });

  const historyPath = path.join(process.cwd(), '.replHistory');

  const setupHistory = promisify(replInstance.setupHistory.bind(replInstance));
  const earlyUnpause = () => {
    prematurelyUnpaused = true;
  };

  Object.assign(replInstance.context, { unpause: earlyUnpause }, context);

  let prematurelyUnpaused = false;
  const promise = setupHistory(historyPath).then(
    () =>
      new Promise<void>(resolve => {
        if (prematurelyUnpaused) {
          replInstance.close();
          replInstance.on('exit', resolve);
        }
        const unpause = () => {
          replInstance.close();
          resolve();
        };
        hybrid.unpause = unpause;
        replInstance.context.unpause = unpause;
      }),
  );

  const hybrid = Object.assign(promise, { repl: replInstance, unpause: earlyUnpause });

  return hybrid;
}
