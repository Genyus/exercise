const displayChart = (coordinates) => {
  const COLUMN_WIDTH = 6;
  const getKey = (x, y) => `[${x},${y}]`;
  const makeSpaces = (num) => Array(num).fill(" ").join("");
  // calculate key values
  const getConfig = (coordinates) => {
    const config = {
      x: { legend: { text: "time" } },
      y: { legend: { text: "£" } },
    };

    // calculate max x and max y values
    config.x.max = coordinates.reduce(
      (max, current) => (current[0] > max ? current[0] : max),
      0
    );
    config.y.max = coordinates.reduce(
      (max, current) => (current[1] > max ? current[1] : max),
      0
    );

    // calculate overall x and y dimensions
    config.x.size =
      3 + config.x.legend.text.length + (config.x.max + 1) * COLUMN_WIDTH; // <space> + legend + <space> + ((max x + 1) * 6) + 1
    config.y.size = 3 + config.y.max; // <border> + max y + <border> + <legend>

    // calculate x and y axis legend start points
    config.x.legend.position = [
      2 +
        config.y.legend.text.length +
        Math.floor(((config.x.max + 1) * COLUMN_WIDTH) / 2) -
        Math.floor(config.x.legend.text.length / 2),
      config.y.size - 1,
    ];
    config.y.legend.position = [1, Math.floor(config.y.max / 2) + 1];

    return config;
  };
  // render chart
  const render = (config, data) => {
    // convert data array to Map
    const dataMap = new Map(
      data.map((current) => [getKey(current[0], current[1]), undefined])
    );
    // render rows
    for (let row = config.y.size - 1; row >= 0; row--) {
      // render y legend
      const legend =
        row === config.y.legend.position[1]
          ? ` ${config.y.legend.text} `
          : makeSpaces(config.y.legend.text.length + 2);
      // render columns
      let columns = "";
      for (let col = 0; col <= config.x.max; col++) {
        const first = dataMap.has(getKey(col, row))
          ? "*"
          : row === 0 || row === config.y.size - 1 || col === 0
          ? "+"
          : " ";
        const rest = row === 0 || row === config.y.size - 1 ? "-----" : "     ";

        columns = `${columns}${first}${rest}`;
      }
      console.log(`${legend}${columns}+`);
    }
    // render x legend
    const spaces = makeSpaces(config.x.legend.position[0]);

    console.log(`${spaces}${config.x.legend.text}`);
  };

  render(getConfig(coordinates), coordinates);
};
const data = [
  [1, 2],
  [2, 3],
  [3, 1],
  [4, 6],
  [5, 8],
];

displayChart(data);
