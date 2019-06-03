// https://github.com/erikdubbelboer/node-sleep/blob/master/README.md

function msleep(n) {
  // eslint-disable-next-line no-undef
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n * 1000);
}

module.exports = sleep;
