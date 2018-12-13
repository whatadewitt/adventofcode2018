const fs = require("fs");

let data, current, last, exploder, len;

function readInput() {
  const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("input.txt")
  });

  lineReader
    .on("line", line => {
      data = line;
    })
    .on("close", () => {
      // this would be easier with regex... right?
      let done = false;
      data = data.split("");
      len = data.length;

      while (!done) {
        exploder = -1;
        for (let i = 0; i < len - 1; i++) {
          // i = 1; i < len; i++ didn't work
          current = data[i];
          last = data[i + 1]; // i - 1 didn't work... why not?!?

          if (current === undefined) {
            console.log(data.length);
            process.exit(0);
          }

          if (
            (current.toUpperCase() == last && last.toLowerCase() == current) ||
            (current.toLowerCase() == last && last.toUpperCase() == current)
          ) {
            exploder = i;

            break;
          }
        }

        if (exploder < 0) {
          done = true;
        } else {
          data.splice(exploder, 2);
        }
      }

      console.log(data.length);
      process.exit(0);
    });
}

readInput();
