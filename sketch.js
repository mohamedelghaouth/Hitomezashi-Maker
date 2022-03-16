
var arrX = Array.from({length: 31}, () => Math.round(Math.random()));
var arrY = Array.from({length: 31}, () => Math.round(Math.random()));
var angle = 0;
var coloringadvance= 0.005;
var speed = 0.5;



var maxX = 0;
var minX = 60;
var maxY = 0;
var minY = 20;
var numb = 0;

var step = 40;


function setup() {
  createCanvas(500, 500).parent("sketch");
  numb = Math.floor((height - 60)/step);
  maxX = 40 + numb*step;
  minX = 40;
  maxY = height - 40;
  minY = height - 40 - numb*step;
  background(220);
  grid();
}

function draw() {
  if(dohorizontal){
    horizontal();
  }   else if(dovertical) {
    vertical();
  } else if(docoloring) {
    coloring(doscoring);
    horizontal();
    vertical();
  }
}

function clearCanvas() {
  clear();
  loop()
}


function grid() {
  for (var i = 1; i <numb; i += 1) {
    text(arrX[i], i*step + 40, maxY + 20);
  }
  
  // vertical lines
  line(minX, minY, minX, maxY);
  line(maxX, minY, maxX, maxY);

  // horizontal  lines
  line(minX, minY, maxX, minY);
  line(minX, maxY, maxX, maxY);

  for (var j = 1; j <numb; j += 1) {
    text(arrY[j], minX - 20, maxY - j*step);
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
  let tmpy = 0;
  let tmpx = 0;
  for (let j = 1; j <numb; j += 1) {
    tmpy = maxY - j*step
    if(arrY[j] === 0) {
      for (let i = 1; i <numb; i += 2) {
        tmpx = minX + i*step;
        animateLine(tmpx, tmpy, tmpx + step, tmpy);
      }
    }

    if(arrY[j] === 1) {
      for (let i = 0; i <numb; i += 2) {
        tmpx = minX + i*step;
        animateLine(tmpx, tmpy, tmpx + step, tmpy);
      }
    }
  }
}

function vertical() {
  let tmpy = 0;
  let tmpx = 0;
  for (let i = 1; i <numb; i += 1) {
    tmpx = i*step + 40;
    if(arrX[i] === 0) {
      for (let j = 1; j <numb; j += 2) {
        tmpy = maxY - j*step - 40
        animateLine(tmpx, tmpy, tmpx, tmpy + step);
      }
    }

    if(arrX[i] === 1) {
      for (let j = 0; j <numb; j += 2) {
        tmpy = maxY - j*step - 40
        animateLine(tmpx, tmpy, tmpx, tmpy + step);
      }
    }
  }
}

function coloring(showScore) {
  let sumH = 0;
  let sumV = 0;
  let tmpArrX = [];
  let tmpy = 0;
  let tmpx = 0;
  tmpArrX.push(sumH);
  for (var i = 0; i <numb; i += 1) {
    tmpx = i*step + 40;
    animatedColoringRect(sumH, tmpx, maxY - step, step, step);
    if(showScore) {
      text(sumH, tmpx + 15 , maxY - 5);
    }
    sumH = ((sumH + arrX[i + 1]) % 2);
    tmpArrX.push(sumH);
  }

  for (var i = 0; i <numb; i += 1) {
    tmpx = i*step + 40;
    sumV = tmpArrX[i];
    for (var j = 1; j <numb; j += 1) {
      tmpy = maxY - (j)*step - 40
      if(((i % 2) === 1) && (arrY[j] === 0)){
        sumV = ((sumV + 1) % 2);
      }

      if(((i % 2) === 0) && (arrY[j] === 1)){
        sumV = ((sumV + 1) % 2);
      }
      animatedColoringRect(sumV, tmpx, tmpy, step, step);
      if(showScore) {
        text(sumV, tmpx + 15 , tmpy + 25);
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
