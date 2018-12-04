const fs = require("fs");

let twoCount = 0;
let threeCount = 0;

function readInput() {
  const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("input.txt")
  });

  lineReader
    .on("line", line => {
      const dict = {};

      for (let i = 0; i < line.length; i++) {
        let char = line[i];
        if ("undefined" === typeof dict[char]) {
          dict[char] = 0;
        }

        dict[char] = dict[char] + 1;
      }

      if (Object.entries(dict).filter(([key, val]) => val === 2).length) {
        twoCount++;
      }

      if (Object.entries(dict).filter(([key, val]) => val === 3).length) {
        threeCount++;
      }
    })
    .on("close", () => {
      console.log("ended");
      console.log(twoCount, threeCount);
      console.log(twoCount * threeCount);
      process.exit(0);
    });
}

readInput();
