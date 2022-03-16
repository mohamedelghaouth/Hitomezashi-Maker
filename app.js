var dohorizontal = false;
var dovertical = false;
var docoloring = false;
var doscoring = false;


const starHbuttton = document.querySelector("#horizontal");
const starVbuttton = document.querySelector("#vertical");
const starCbuttton = document.querySelector("#coloring");
const starSbuttton = document.querySelector("#scoring");


starHbuttton.addEventListener("click", function() {
     angle = 0;
     setbools(true, false, false, false)
});

starVbuttton.addEventListener("click", function() {
    angle = 0;
    setbools(false, true, false, false)
});

starCbuttton.addEventListener("click", function() {
    setbools(false, false, true, false)
});

starSbuttton.addEventListener("click", function() {
    setbools(false, false, true, true)
});


function setbools(a, b, c, d){
    dohorizontal = a;
    dovertical = b;
    docoloring = c;
    doscoring = d;
}
