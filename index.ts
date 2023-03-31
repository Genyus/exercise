/**
 * Represents a single point as [x,y] coordinates
 */
type Point = [number, number];

/**
 * Represents the configuration of the chart to be displayed
 */
type ChartConfig = {
  x: {
    legend: {
      text: string;
      position?: [number, number];
    };
    max?: number;
    size?: number;
  };
  y: {
    legend: {
      text: string;
      position?: [number, number];
    };
    max?: number;
    size?: number;
  };
};

/**
 * Displays a chart for the given points
 * @param points An array of points
 */
const displayChart = (points: Point[]): void => {
  const COLUMN_WIDTH = 6;

  /**
   * Gets a string key for a pair of coordinates
   * @param x The X coordinate
   * @param y The Y coordinate
   * @returns The key 
   */
  const getKey = (x: number, y: number): string => `[${x},${y}]`;
  
  /**
   * Gets the configuration values for the chart
   * @param points The array of points to be charted
   * @returns The configuration object
   */
  const getConfig = (points: Point[]): ChartConfig => {
    const config: ChartConfig = {
      x: { legend: { text: "time" } },
      y: { legend: { text: "£" } },
    };

    // calculate max x and max y values
    config.x.max = points.reduce(
      (max, current) => (current[0] > max ? current[0] : max),
      0
    );
    config.y.max = points.reduce(
      (max, current) => (current[1] > max ? current[1] : max),
      0
    );

    // calculate overall x and y dimensions
    config.x.size =
      3 + config.x.legend.text.length + (config.x.max! + 1) * COLUMN_WIDTH; // <space> + legend + <space> + ((max x + 1) * 6) + 1
    config.y.size = 2 + config.y.max!; // <border> + (max y - 1) + <border> + <legend>

    // calculate x and y axis legend start points
    config.x.legend.position = [
      2 +
        config.y.legend.text.length +
        Math.floor(((config.x.max! + 1) * COLUMN_WIDTH) / 2) -
        Math.floor(config.x.legend.text.length / 2),
      config.y.size! - 1,
    ];
    config.y.legend.position = [1, Math.floor(config.y.max! / 2) + 1];

    return config;
  };
  
  /**
   * Renders the chart
   * @param config The configuration object
   * @param points The points array to be rendered
   */
  const render = (config: ChartConfig, points: Point[]): void => {
    // convert data array to Map
    const dataMap = new Map(
      points.map((current) => [getKey(current[0], current[1]), undefined])
    );
    const legendSequence = " ".repeat(config.y.legend.text.length + 2);
    const borderSequence = "-".repeat(COLUMN_WIDTH - 1);
    const cellSequence = " ".repeat(COLUMN_WIDTH - 1);

    // render rows
    for (let row = config.y.size! - 1; row >= 0; row--) {
      // render y legend
      const legend =
        row === config.y.legend.position![1]
          ? ` ${config.y.legend.text} `
          : legendSequence;
      // render columns
      let columns = "";

      for (let col = 0; col <= config.x.max!; col++) {
        const first = dataMap.has(getKey(col, row))
          ? "*"
          : row === 0 || row === config.y.size! - 1 || col === 0
          ? "+"
          : " ";
        const rest =
          row === 0 || row === config.y.size! - 1
            ? borderSequence
            : cellSequence;

        columns = `${columns}${first}${rest}`;
      }
      console.log(`${legend}${columns}+`);
    }
    // render x legend
    const spaces = " ".repeat(config.x.legend.position![0]);

    console.log(`${spaces}${config.x.legend.text}`);
  };

  render(getConfig(points), points);
};

const data: Point[] = [
  [1, 2],
  [2, 3],
  [3, 1],
  [4, 6],
  [5, 8],
];

displayChart(data);
