const chart = (data) => {
  const createKey = (x, y) => `[${x},${y}]`;
  const makeSpaces = (num) => Array(num).fill(" ").join("");
  // calculate key values
  const calculateKeyValues = () => {
    const xLegend = "time";
    const yLegend = "£";
    const coordinates = {
      x: { legend: { text: xLegend } },
      y: { legend: { text: yLegend } },
    };

    // calculate max x and max y values
    coordinates.x.max = data.reduce(
      (max, current) => (current[0] > max ? current[0] : max),
      0
    );
    coordinates.y.max = data.reduce(
      (max, current) => (current[1] > max ? current[1] : max),
      0
    );

    // calculate overall x and y dimensions
    coordinates.x.size =
      3 + coordinates.x.legend.text.length + (coordinates.x.max + 1) * 6; // <space> + legend + <space> + ((max x + 1) * 6) + 1
    coordinates.y.size = 3 + coordinates.y.max; // <border> + max y + <border> + <legend>

    // calculate x and y axis legend start points
    coordinates.x.legend.position = [
      2 +
        coordinates.y.legend.text.length +
        (coordinates.x.max + 1) * 3 -
        Math.floor(coordinates.x.legend.text.length / 2),
      coordinates.y.size - 1,
    ];
    coordinates.y.legend.position = [
      1,
      Math.floor((coordinates.y.max + 1) / 2),
    ];

    return coordinates;
  };
  // render chart
  const render = (values, data) => {
    // convert data array to Map
    const dataMap = new Map(
      data.map((current) => [createKey(current[0], current[1]), undefined])
    );
    // render rows
    for (let row = values.y.size - 1; row >= 0; row--) {
      // render y legend
      const legend =
        row === values.y.legend.position[1]
          ? ` ${values.y.legend.text} `
          : makeSpaces(values.y.legend.text.length + 2);
      // render columns
      let columns = "";
      for (let col = 0; col <= values.x.max; col++) {
        const first = dataMap.has(createKey(col, row))
          ? "*"
          : row === 0 || row === values.y.size - 1 || col === 0
          ? "+"
          : " ";
        const rest = row === 0 || row === values.y.size - 1 ? "-----" : "     ";

        columns = `${columns}${first}${rest}`;
      }
      console.log(`${legend}${columns}+`);
    }
    // render x legend
    const spaces = makeSpaces(values.x.legend.position[0]);

    console.log(`${spaces}${values.x.legend.text}`);
  };

  render(calculateKeyValues(), data);
};
const data = [
  [1, 2],
  [2, 3],
  [3, 1],
  [4, 6],
  [5, 8],
];

chart(data);
