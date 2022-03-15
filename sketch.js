
var arrX = Array.from({length: 31}, () => Math.round(Math.random()));
var arrY = Array.from({length: 31}, () => Math.round(Math.random()));
var angle = 0;
var coloringadvance= 0;
var speed = 0.005;


function setup() {
  createCanvas(500, 500).parent("sketch");;
  background(220);
  grid();
  
}

function draw() {
  if(dohorizontal){
    horizontal();
  }   else if(dovertical) {
    vertical();
  } else if(docoloring) {
    coloring();
    horizontal();
    vertical();
  } else if(doscoring) {
    scoring();
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
    text(arrX[x], i, height  - 20);
  }

  line(40, 20, 40, height - 40);
  line(width  - 20, 20, width  - 20, height - 40);

  line(width  - 20, height - 40, 40, height - 40);
  line(40, 20, height - 20, 20);

  for (var j = height - 60; j > 20 ; j -= 20) {
    x = Math.abs((j - (height - 60))/20);
    text(arrY[x], 20, j);
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
  for (let j = height - 60; j > 20 ; j -= 20) {
    x = Math.abs((j- (height - 60))/20);
    if(arrY[x] === 0) {
      for (let i = 60; i < width - 20; i += 40) {
        animateLine(i, j, i + 20, j);
      }
    }

    if(arrY[x] === 1) {
      for (let i = 40; i < width - 20; i += 40) {
        animateLine(i, j, i + 20, j);
      }
    }

  }
}

function vertical() {
  let x = 0;
  for (var i = 60; i < width - 20; i += 20) {
    x = (i-60)/20;

    if(arrX[x] === 0) {
      for (var j = height - 60; j > 20 ; j -= 40) {
        animateLine(i, j, i, j - 20);
      }
    }

    if(arrX[x] === 1) {
      for (var j = height - 40; j > 20 ; j -= 40) {
        animateLine(i, j, i, j - 20);
      }
    }

  }
}

function coloring() {
  let x = 0;
  let y = 0;
  let sumH = 0;
  let sumV = 0;
  let tmpArrX = [];
  tmpArrX.push(sumH);
  for (var i = 60; i <= width - 20; i += 20) {
    x = (i-60)/20;
    animatedColoringRect(sumH, i - 20, height - 60, 20, 20);
    sumH = ((sumH + arrX[x]) % 2);
    // coloring
    tmpArrX.push(sumH);
  }

  for (var i = 60; i <= width - 20; i += 20) {
    x = (i-60)/20;
    sumV = tmpArrX[x];
    for (var j = height - 60; j >= 20 ; j -= 20) {
      animatedColoringRect(sumV, i - 20, j, 20, 20);
      y = Math.abs((j - (height - 60))/20);
      let tmp = i/20;
      if(((tmp % 2) === 0) && (arrY[y] === 0)){
        sumV = ((sumV + 1) % 2);
      }

      if(((tmp % 2) === 1) && (arrY[y] === 1)){
        sumV = ((sumV + 1) % 2);
      }
    }
  }
  
}

function animatedColoringRect(sum, x1, y1, x2, y2) {
  let tempY = map(coloringadvance, 0, y1, 0,  y2, 1);
  push()
  if(sum === 0){
    stroke(255,204,255)
    fill(255,204,255);
  } else {
    stroke(255,204,153)
    fill(255,204,153);
  }
  rect(x1, y1, x2, tempY);
  pop();
  coloringadvance += 0.5;
}

function scoring() {
  let x = 0;
  let y = 0;
  let sumH = 0;
  let sumV = 0;
  let tmpArrX = [];
  text(sumH, 45 , height  - 45);
  tmpArrX.push(sumH);
  for (var i = 60; i < width - 20; i += 20) {

    x = (i-60)/20;
    sumH = ((sumH + arrX[x]) % 2);

    // coloring

    text(sumH, i + 5 , height  - 45);
    tmpArrX.push(sumH);
  }

  for (var i = 60; i <= width - 20; i += 20) {
    x = (i-60)/20;
    sumV = tmpArrX[x];
    for (var j = height - 60; j > 20 ; j -= 20) {
      y = Math.abs((j - (height - 60))/20);
      let tmp = i/20;
      if(((tmp % 2) === 0) && (arrY[y] === 0)){
        sumV = ((sumV + 1) % 2);
      }

      if(((tmp % 2) === 1) && (arrY[y] === 1)){
        sumV = ((sumV + 1) % 2);
      }
      text(sumV, i - 15, j - 5);
    }
  }
}