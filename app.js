var dohorizontal = false;
var dovertical = false;
var docoloring = false;
var doscoring = false;
var step;



const starHbuttton = document.querySelector("#horizontal");
const starVbuttton = document.querySelector("#vertical");
const starCbuttton = document.querySelector("#coloring");
const starSbuttton = document.querySelector("#scoring");
const clearbuttton = document.querySelector("#clear");

const slider = document.getElementById("myRange");
const output = document.getElementById("demo");

output.innerHTML = slider.value;
step = parseInt(slider.value);

slider.oninput = function() {
  output.innerHTML = this.value;
  step = parseInt(this.value)
  clearCanvas()
}

starHbuttton.addEventListener("click", function() {
     angle = 0;
     setbools(true, false, false, false)
});

starVbuttton.addEventListener("click", function() {
    angle = 0;
    setbools(false, true, false, false);
});

starCbuttton.addEventListener("click", function() {
    setbools(false, false, !docoloring, doscoring)
    clearCanvas()
});

starSbuttton.addEventListener("click", function() {
    setbools(false, false, docoloring, !doscoring)
    clearCanvas()
});

clearbuttton.addEventListener("click", function() {
    setbools(false, false, false, false)
    arrX = Array.from({length: 100}, () => Math.round(Math.random()));
    arrY = Array.from({length: 100}, () => Math.round(Math.random()));
    clear();
    setup();
});

function setbools(a, b, c, d){
    dohorizontal = a;
    dovertical = b;
    docoloring = c;
    doscoring = d;
}
