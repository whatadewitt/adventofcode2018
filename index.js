const fs = require("fs");

let twoCount = 0;
let threeCount = 0;

function readInput() {
  const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("input.txt")
  });

  let packages = [];
  lineReader
    .on("line", line => {
      packages.push(line);
    })
    .on("close", () => {
      // sort the list
      packages = packages.sort();

      let i, j, last_diff;
      for (i = 1; i < packages.length; i++) {
        const current = packages[i].split("");
        const prev = packages[i - 1].split("");

        if (current.length !== prev.length) {
          continue;
        }

        let diffs = 0;
        for (j = 0; j < current.length; j++) {
          if (current[j] !== prev[j]) {
            diffs++;

            if (diffs > 1) {
              break;
            }

            last_diff = j;
          }
        }

        // jumping out as early as possible...
        if (diffs === 1) {
          console.log(
            "diff at pos",
            last_diff,
            current[last_diff],
            prev[last_diff]
          );
          console.log(current.join(""));
          console.log(prev.join(""));
          current.splice(last_diff, 1);
          prev.splice(last_diff, 1);

          console.log(current.join(""));
          console.log(prev.join(""));
          break;
        }
      }

      process.exit(0);
    });
}

readInput();
