const fs = require("fs");

let data, current, next, exploder, len, min;
let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

function readInput() {
  const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("input.txt")
  });

  lineReader
    .on("line", line => {
      data = line;
    })
    .on("close", () => {
      min = data.length;

      for (let j = 0; j < alphabet.length; j++) {
        console.log(alphabet[j]);
        let safeData = (" " + data).slice(1); // clone the data string
        safeData = safeData
          .replace(alphabet[j], "")
          .replace(alphabet[j].toUpperCase(), "");

        safeData = [...safeData.split("")];

        len = safeData.length;

        while (!done) {
          exploder = -1;
          for (let i = 0; i < len - 1; i++) {
            current = safeData[i];
            next = safeData[i + 1];

            if (current === undefined) {
              min = Math.min(min, safeData.length);
              done = true;
              break;
            }

            if (
              (current.toUpperCase() == next &&
                next.toLowerCase() == current) ||
              (current.toLowerCase() == next && next.toUpperCase() == current)
            ) {
              exploder = i;
              break;
            }
          }

          if (exploder < 0) {
            done = true;
          } else {
            safeData.splice(exploder, 2);
          }
        }
      }

      console.log(min);
      process.exit(0);
    });
}

readInput();
