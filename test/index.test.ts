import { expect } from 'chai';
import { describe } from 'mocha';
import { pause } from '../src/index';

describe('pause', async function () {
  it('should open a repl and return a promise that is resolved with an `unpause()` method', async () => {
    let finished = false,
      replClosed = false;
    const replPromise = pause({ test: 'test' });
    expect(finished).to.be.false;
    expect(replClosed).to.be.false;
    replPromise.then(() => {
      finished = true;
    });
    const repl = replPromise.repl;
    repl.on('exit', () => {
      replClosed = true;
    });
    repl.write('unpause()\n');
    await replPromise;
    expect(finished).to.be.true;
    expect(replClosed).to.be.true;
  });

  it('should return a working unpause method attached to the promise', async () => {
    let finished = false,
      replClosed = false;
    const replPromise = pause({ test: 'test' });
    expect(finished).to.be.false;
    expect(replClosed).to.be.false;
    replPromise.then(() => {
      finished = true;
    });
    const repl = replPromise.repl;
    repl.on('exit', () => {
      replClosed = true;
    });

    replPromise.unpause();
    await replPromise;
    expect(finished).to.be.true;
    expect(replClosed).to.be.true;
  });

  it('repl should stay open until unpaused', done => {
    let finished = false,
      replClosed = false;
    const replPromise = pause({ test: 'test' });
    setTimeout(() => {
      expect(finished).to.be.false;
      expect(replClosed).to.be.false;
      replPromise.then(() => {
        finished = true;
      });
      const repl = replPromise.repl;
      repl.on('exit', () => {
        replClosed = true;
      });

      replPromise.unpause();
      replPromise.then(() => {
        expect(finished).to.be.true;
        expect(replClosed).to.be.true;
        done();
      });
    }, 500);
  });
});
