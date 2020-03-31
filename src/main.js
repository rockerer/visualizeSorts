// just messing around and start with bogosort

let canv;
let toSort;

function init() {
    canv = document.getElementById('canv').getContext('2d');

    test();

//    Bogosort(shuffle([...Array(10).keys()]));
}

function render() {

}

function test() {
    canv.moveTo(100,100);
    canv.lineTo(300,400);
    canv.stroke();
}