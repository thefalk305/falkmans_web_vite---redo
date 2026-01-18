// sequenceCheck.js
// Prints whether n is in the sequence for n = 2..255

function inSequence(n) {
  if (n < 2) return false;
  const pow = 1 << Math.floor(Math.log2(n));   // largest power of 2 <= n
  const blockSize = pow >> 1;                  // half of that power
  return n < pow + blockSize;
}

for (let n = 2; n <= 255; n++) {
  console.log(n, inSequence(n));
}