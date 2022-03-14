var dohorizontal = false;
var dovertical = false;
var docoloring = false;

const starHbuttton = document.querySelector("#horizontal");
const starVbuttton = document.querySelector("#vertical");
const starCbuttton = document.querySelector("#coloring");

starHbuttton.addEventListener("click", function() {
     angle = 0;
     setbools(true, false, false)
});

starVbuttton.addEventListener("click", function() {
    angle = 0;
    setbools(false, true, false)
});

starCbuttton.addEventListener("click", function() {
    setbools(false, false, true)
});


function setbools(a, b, c){
    dohorizontal = a;
    dovertical = b;
    docoloring = c;
}
