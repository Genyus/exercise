const chart = (data) => {
  // TODO: calculate key values
  const calculateKeyValues = () => {
    const coordinates = { x: {}, y: {} };

    coordinates.x.max = data.reduce(
      (max, current) => (current[0] > max ? current[0] : max),
      0
    );
    coordinates.y.max = data.reduce(
      (max, current) => (current[1] > max ? current[1] : max),
      0
    );

    // TODO: calculate x and y axis legend lengths
    // TODO: calculate x and y axis legend start points
    // TODO: calculate overall x and y dimensions

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
