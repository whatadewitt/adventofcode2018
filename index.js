const fs = require("fs");
const dateFns = require("date-fns");

function readInput() {
  const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("input.txt")
  });

  let records = [];
  let emptyArray = [];
  for (let i = 0; i < 59; i++) {
    emptyArray[i] = 0;
  }

  lineReader
    .on("line", line => {
      const match = /\[1518-(\d+)-(\d+) (\d+):(\d+)\]\s(.*)/.exec(line);

      let timestamp = new Date(
        2018, // because 1518 doesn't matter?
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10),
        parseInt(match[4], 10)
      );

      records.push({
        time: timestamp,
        min: match[4],
        log: match[5]
      });
    })
    .on("close", () => {
      records = records.sort((a, b) => {
        if (a.time.getTime() < b.time.getTime()) return -1;
        if (a.time.getTime() > b.time.getTime()) return 1;
        return 0;
      });

      let currentGuard = -1;
      let sleepStart, sleepEnd;

      let guardLogs = {};
      let guardTotals = {};
      records = records.forEach(({ min, log }) => {
        switch (log) {
          case "falls asleep":
            sleepStart = min;
            break;

          case "wakes up":
            sleepEnd = min;

            for (let i = sleepStart; i < sleepEnd; i++) {
              guardLogs[currentGuard][i]++;
              guardTotals[currentGuard]++;
            }
            break;

          default:
            currentGuard = log.match(/\d+/g);
            if ("undefined" === typeof guardLogs[currentGuard]) {
              guardLogs[currentGuard] = [...emptyArray];
              guardTotals[currentGuard] = 0;
            }

            break;
        }
      });

      let guardHighVal = -1,
        guardHighIdx = -1;

      Object.keys(guardTotals).forEach(k => {
        if (guardTotals[k] > guardHighVal) {
          guardHighVal = guardTotals[k];
          guardHighIdx = k;
        }
      });

      let maxVal = -1,
        maxIdx = -1;

      guardLogs[guardHighIdx].forEach((val, idx) => {
        if (val > maxVal) {
          maxVal = val;
          maxIdx = idx;
        }
      });

      console.log(maxVal, maxIdx, guardHighIdx);
      console.log(guardHighIdx * maxIdx);

      process.exit(0);
    });
}

readInput();
