function drawGround(context, width, height, groundColor) {
  const { r, g, b } = groundColor;
  const color = `rgb(${r} ,${g} ,${b})`;

  context.clearRect(0, 0, width, height);
  context.fillStyle = color;
  context.fillRect(0, 0, width, height);
}

function drawBugs(context, bugs) {
  for (let i = 0; i < bugs.length; i++) {
    const bug = bugs[i];
    const { color: { r, g, b } } = bug;

    context.fillStyle = `rgb(${r} ,${g} ,${b})`;
    context.fillRect(bug.x, bug.y, bug.width, bug.height);

    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.strokeRect(bug.x, bug.y, bug.width, bug.height);
  }
}

function draw(context, width, height, groundColor, bugs) {
  drawGround(context, width, height, groundColor);
  drawBugs(context, bugs);
}

export {
  drawGround,
  draw
};