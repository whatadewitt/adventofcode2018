const fs = require("fs");

let sum = 0;
let doubleCheck = {};

function readInput() {
  const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("input.txt")
  });

  lineReader
    .on("line", line => {
      sum += parseInt(line, 10);

      if (typeof doubleCheck[sum] === "undefined") {
        doubleCheck[sum] = 1;
      } else {
        doubleCheck[sum] = doubleCheck[sum]++;
        console.log("END", sum, doubleCheck[sum]);
        process.exit(0);
      }
    })
    .on("close", () => {
      console.log("ended");
      console.log(sum);
      // process.exit(0);

      readInput();
    });
}

readInput();
