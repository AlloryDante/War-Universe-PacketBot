function calculateDistanceBetweenPoints(x1, y1, x2, y2) {
  return parseInt(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
}
function getRandomPoint(width, height) {
  const x = parseInt(Math.random() * width); // Random value between 0 and width
  const y = parseInt(Math.random() * height); // Random value between 0 and height
  return { x, y }; // Return as an object
}
module.exports.calculateDistanceBetweenPoints = calculateDistanceBetweenPoints;
module.exports.getRandomPoint = getRandomPoint;
