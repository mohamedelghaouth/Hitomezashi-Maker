const fonSize = new Map([
  [20, {size:10, decalageH:4, decalageV: 11}],
  [30, {size:12, decalageH:6, decalageV: 13}],
  [40, {size:14, decalageH:8, decalageV: 15}],
  [50, {size:16, decalageH:10, decalageV: 17}],
  [60, {size:16, decalageH:12, decalageV: 19}],
  [70, {size:16, decalageH:14, decalageV: 21}],
  [80, {size:16, decalageH:16, decalageV: 22}],
]);

var colorArray = ['#FFCCFF', '#FFCC99',
'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']; // length = 52
var col = 0;
var colNumb = 2;
var arrX = Array.from({length: 100}, () => Math.round(Math.random()));
var arrY = Array.from({length: 100}, () => Math.round(Math.random()));
var angle = 0;
var coloringadvance= 0.005;
var speed = 0.5;



var maxX = 0;
var minX = 60;
var maxY = 0;
var minY = 20;
var numb = 0;

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
  } 
   if(dovertical) {
    vertical();
  } 
   if(docoloring || doscoring || doMcoloring) {
     if(docoloring){
      coloring(docoloring, doscoring);
     }

     if(doMcoloring){
      multipleColoring(doMcoloring, doscoring);
     }

    horizontal();
    vertical();
  }
}

function clearCanvas() {
  clear();
  setup();
  horizontal();
  vertical();
  loop();
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
        tmpy = maxY - (j + 1)*step
        animateLine(tmpx, tmpy, tmpx, tmpy + step);
      }
    }

    if(arrX[i] === 1) {
      for (let j = 0; j <numb; j += 2) {
        tmpy = maxY - (j + 1)*step
        animateLine(tmpx, tmpy, tmpx, tmpy + step);
      }
    }
  }
}

function coloring(showColor, showScore) {
  let sumH = 0;
  let sumV = 0;
  let tmpArrX = [];
  let tmpy = 0;
  let tmpx = 0;
  tmpArrX.push(sumH);
  for (var i = 0; i <numb; i += 1) {
    tmpx = i*step + 40;
    if(showColor) {
      animatedColoringRect(sumH, tmpx, maxY - step, step, step);
    } 

    if(showScore && (step >= 20)) {
      let tmp = fonSize.get(step);
      push()
      textSize(tmp.size);
      text(sumH, tmpx + tmp.decalageH , maxY - tmp.decalageV);
      pop();
    }
    sumH = ((sumH + arrX[i + 1]) % colNumb);
    tmpArrX.push(sumH);
  }

  for (var i = 0; i <numb; i += 1) {
    tmpx = i*step + 40;
    sumV = tmpArrX[i];
    for (var j = 1; j <numb; j += 1) {
      tmpy = maxY - (j + 1)*step
      if(((i % 2) === 1) && (arrY[j] === 0)){
        sumV = ((sumV + 1) % colNumb);
      }

      if(((i % 2) === 0) && (arrY[j] === 1)){
        sumV = ((sumV + 1) % colNumb);
      }
      if(showColor) {
        animatedColoringRect(sumV, tmpx, tmpy, step, step);
      } 

      if(showScore && (step >= 20)) {
        let tmp = fonSize.get(step);
        push()
        textSize(tmp.size);
        text(sumV, tmpx + tmp.decalageH , tmpy + tmp.decalageV);
        pop();
      }
    }
  }
}


function multipleColoring(showColor, showScore) {

  let cellArr = creatCells();
  let sum = 0;
  cellArr.forEach(cell => {
    if(!cell.visited){
      
      if (cell.score == -1) {
        sum += 1;
        cell.score = sum;
      }
      let tmpArr = [];
      tmpArr.push(cell);
      while (tmpArr.length > 0) {
        cell = tmpArr.shift();
        cell.color = colorArray[sum % colNumb]
        cell.visited = true;
        if(showColor) {
          animatedColoringRect(sum % colNumb, cell.x, cell.y, step, step);
        } 
    
        if(showScore && (step >= 20)) {
          let tmp = fonSize.get(step);
          push()
          textSize(tmp.size);
          text(cell.score, cell.x + tmp.decalageH , cell.y + tmp.decalageV);
          pop();
        }

        cell.neighbors.filter(neighbor => neighbor != null).forEach(neighbor => {
          if(!neighbor.visited){
            neighbor.score = cell.score;
            neighbor.visited = true;
            tmpArr.push(neighbor);
          }
        });
      }
    }
  });
}

function creatCells(){
  let cellArr = new Array(numb);
  let tmpArr = [];

  let tmpy = 0;
  let tmpx = 0;

  for (var i = 0; i <cellArr.length; i += 1) {
    cellArr[i] = new Array(numb);
  }

  // create cells
  for (var i = 0; i <numb; i += 1) {
    tmpx = i*step + 40;
    for (var j = 0; j <numb; j += 1) {
      tmpy = maxY - (j + 1)*step
      cellArr[i][j] = new Cell(tmpx, tmpy)
    }
  }


  // Link cells
  let cell;
  let tmpCell;
  for (var i = 0; i <numb; i += 1) {
    tmpx = i*step + 40;
    for (var j = 0; j <numb; j += 1) {
      tmpy = maxY - (j + 1)*step
      cell = cellArr[i][j]
      if(i - 1 >= 0){
        if( ( (arrX[i] == 0) && ( ((j + 1) % 2) == 1) ) 
            || 
            ( (arrX[i] == 1) && ( ((j + 1) % 2) == 0) ) 
          )
          {
            tmpCell = cellArr[i - 1][j]
            cell.setNeighbor(1, tmpCell)
            tmpCell.setNeighbor(3, cell)
          }
      }
      if((i + 1 < numb) ){
        if( ( (arrX[i + 1] == 0) && ( ((j + 1) % 2) == 1) ) 
            || 
            ( (arrX[i + 1] == 1) && ( ((j + 1) % 2) == 0) ) 
          )
          {
            tmpCell = cellArr[i + 1][j]
            cell.setNeighbor(3, tmpCell)
            tmpCell.setNeighbor(1, cell)
          }
      }
      if(j - 1 >= 0 ){
        if( ( ((i + 1) % 2) === 1) && (arrY[j] === 0) 
            || 
            ( ((i + 1) % 2) === 0) && (arrY[j] === 1) 
          )
          {
            tmpCell = cellArr[i][j - 1]
            cell.setNeighbor(2, tmpCell)
            tmpCell.setNeighbor(0, cell)
          }
      }
      if(j + 1 < numb ){
        if( ( ((i + 1) % 2) === 1) && (arrY[j + 1] === 0) 
            || 
            ( ((i + 1) % 2) === 0) && (arrY[j + 1] === 1) 
          )
          {
            tmpCell = cellArr[i][j + 1]
            cell.setNeighbor(0, tmpCell)
            tmpCell.setNeighbor(2, cell)
          }
      }
      tmpArr.push(cell);
    }
  }
  return tmpArr;
}

function animatedColoringRect(sum, x1, y1, x2, y2) {
  let tempY = map(coloringadvance, 0, y1, 0,  y2, 1);
  push()
  stroke(colorArray[sum])
  fill(colorArray[sum]);
  rect(x1, y1, x2, tempY);
  pop();
  coloringadvance += 0.5;
}
