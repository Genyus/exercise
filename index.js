const chart = (data) => {
  // TODO: calculate key values
  const calculateKeyValues = () => {
    const coordinates = { x: { legend: {} }, y: { legend: {} } };
    const xLegend = "time";
    const yLegend = "£";

    coordinates.x.max = data.reduce(
      (max, current) => (current[0] > max ? current[0] : max),
      0
    );
    coordinates.y.max = data.reduce(
      (max, current) => (current[1] > max ? current[1] : max),
      0
    );
    coordinates.x.legend.length = xLegend.length;
    coordinates.y.legend.length = yLegend.length;

    coordinates.x.size =
      3 + coordinates.x.legend.length + (coordinates.x.max + 1) * 6; // <space> + legend + <space> + ((max x + 1) * 6) + 1
    coordinates.y.size =
      3 + coordinates.y.max; // <border> + max y + <border> + <legend>
    // TODO: calculate x and y axis legend start points

    return coordinates;
  };
  calculateKeyValues();
  // TODO: render chart
  //      TODO: render rows
  //          TODO: render y legend
  //          TODO: render columns
  //      TODO: render x legend
};
const data = [
  [1, 2],
  [2, 3],
  [3, 1],
  [4, 6],
  [5, 8],
];

chart(data);
