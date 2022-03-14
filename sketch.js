
var arr = Array.from({length: 31}, () => Math.round(Math.random()));
var arr1 = Array.from({length: 31}, () => Math.round(Math.random()));
var angle = 0;
var speed = 0.0005;


function setup() {
  createCanvas(680, 680);
  background(220);
  grid();
  
}

function draw() {
  if(dohorizontal){
    horizontal();
  }  else if(dovertical) {
    vertical();
  } else if(docoloring) {
    coloring();
  } else {
    stop();
  }
}

function clearCanvas() {
  clear();
  loop()
}


function grid() {
  let x = 0;
  for (var i = 60; i < width - 20; i += 20) {
    x = (i-60)/20;
    text(arr[x], i, height  - 20);
  }

  line(40, 20, 40, height - 40);
  line(width  - 20, 20, width  - 20, height - 40);

  line(width  - 20, height - 40, 40, height - 40);
  line(40, 20, height - 20, 20);

  for (var j = height - 60; j > 20 ; j -= 20) {
    x = Math.abs((j- (height - 40))/20);
    text(arr1[x], 20, j);
  }
  
}

function animateLine(x, y, x1, y1) {
  let v1 = createVector(x, y);
  let v2 = createVector(x1, y1);
  
  let tempX = map(angle, 0, 100, v1.x, v2.x, 1);
  let tempY = map(angle, 0, 100, v1.y, v2.y, 1);
  
  
  line(v1.x, v1.y, tempX, tempY);
  
  angle += speed;
}

function horizontal() {
  let x = 0;
  for (var j = height - 60; j > 20 ; j -= 20) {
    x = Math.abs((j- (height - 60))/20);

    if(arr1[x] === 0) {
      for (var i = 60; i < width - 20; i += 40) {
        animateLine(i, j, i + 20, j);
      }
    }

    if(arr1[x] === 1) {
      for (var i = 40; i < width - 20; i += 40) {
        animateLine(i, j, i + 20, j);
      }
    }

  }
}

function vertical() {
  let x = 0;
  for (var i = 60; i < width - 20; i += 20) {
    x = (i-60)/20;

    if(arr[x] === 0) {
      for (var j = height - 60; j > 20 ; j -= 40) {
        animateLine(i, j, i, j - 20);
      }
    }

    if(arr[x] === 1) {
      for (var j = height - 40; j > 20 ; j -= 40) {
        animateLine(i, j, i, j - 20);
      }
    }

  }
}

function coloring() {
  
}