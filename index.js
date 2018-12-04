const fs = require("fs");

function readInput() {
  const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("input.txt")
  });

  let claims = [];
  const fabric = [];
  fabric.length = 1000;

  const row = [];
  row.length = 1000;

  let i, j;
  for (i = 0; i < fabric.length; i++) {
    fabric[i] = [...row];
  }

  lineReader
    .on("line", line => {
      const claim_data = line.split(" ");
      const [id, at, position, size] = claim_data;
      let [left, top] = position.split(",");
      // clean top...
      top = top.substr(0, top.length - 1);
      let [width, height] = size.split("x");
      claims.push({
        id: parseInt(id.substr(1), 10),
        top: parseInt(top, 10),
        left: parseInt(left, 10),
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        winner: true
      });
    })
    .on("close", () => {
      claims.forEach(({ id, top, left, width, height }) => {
        for (i = top; i < top + height; i++) {
          for (j = left; j < left + width; j++) {
            if ("undefined" === typeof fabric[i][j]) {
              fabric[i][j] = id;
            } else {
              if ("X" !== fabric[i][j]) {
                claims[fabric[i][j] - 1].winner = false;
              }

              claims[id - 1].winner = false;
              fabric[i][j] = "X";
            }
          }
        }
      });
      console.log(claims.filter(c => c.winner));

      process.exit(0);
    });
}

readInput();
