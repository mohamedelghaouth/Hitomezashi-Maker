function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  grid();
}


function grid() {
  let x = 1;
  let y = 1;
  for (var i = 40; i < width - 20; i += 20) {
    text(x, i, height  - 5);
    x++;
  }

  line(20, 20, 20, height - 20);
  line(width  - 20, 20, width  - 20, height - 20);

  line(width  - 20, height - 20, 20, height - 20);

  let tmp = createVector(20, 20);
  let tmp1 = createVector(height - 20, 20);
  line(tmp.x, tmp.y, tmp1.x, tmp1.y);

  for (var j = height - 40; j > 20 ; j -= 20) {
    text(y, 0, j);
    y++;
  }
  
}
