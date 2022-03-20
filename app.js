var dohorizontal = false;
var dovertical = false;
var docoloring = false;
var doscoring = false;
var doMcoloring = false;
var step;



const starHbuttton = document.querySelector("#horizontal");
const starVbuttton = document.querySelector("#vertical");
const starCbuttton = document.querySelector("#coloring");
const starMCbuttton = document.querySelector("#multiple_coloring");
const starSbuttton = document.querySelector("#scoring");
const clearbuttton = document.querySelector("#clear");

const slider = document.getElementById("myRange");
const output = document.getElementById("demo");

output.innerHTML = slider.value;
step = parseInt(slider.value);

slider.oninput = function() {
  output.innerHTML = this.value;
  step = parseInt(this.value)
  clear();
    setup();
}

starHbuttton.addEventListener("click", function() {
     angle = 0;
     setbools(true, false, false, false, false)
});

starVbuttton.addEventListener("click", function() {
    angle = 0;
    setbools(false, true, false, false, false);
});

starCbuttton.addEventListener("click", function() {
    setbools(false, false, !docoloring, doscoring, false)
    colNumb = 2;
    clearCanvas()
});

starSbuttton.addEventListener("click", function() {
    setbools(false, false, docoloring, !doscoring, doMcoloring)
    clearCanvas()
});

clearbuttton.addEventListener("click", function() {
    setbools(false, false, false, false, false)
    arrX = Array.from({length: 100}, () => Math.round(Math.random()));
    arrY = Array.from({length: 100}, () => Math.round(Math.random()));
    clear();
    setup();
});

starMCbuttton.addEventListener("click", function() {
    setbools(false, false, false, doscoring, !doMcoloring)
    colNumb = 50;
    clearCanvas()
});

function setbools(a, b, c, d, e){
    dohorizontal = a;
    dovertical = b;
    docoloring = c;
    doscoring = d;
    doMcoloring = e;
}
