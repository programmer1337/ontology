let links = [], original = [];

let graph = new joint.dia.Graph();
let paper = new joint.dia.Paper({
    el: document.getElementById('paper'),
    width: '100%',
    height: document.documentElement.clientHeight-73,
    model: graph,
    async: true,
    snapLabels: true,
    interactive: {
        elementMove: false,
        labelMove: true,
        arrowheadMove: false},
    defaultConnectionPoint: {
        name: 'boundary',
        args: {
            extrapolate: true,
            sticky: true
        }
    },
});

window.onclick = function (e){
    if(e.target.classList.contains("close")) {
        e.target.parentNode.parentNode.parentNode.style.display = "none";
    }
}

document.getElementById('buttonStorage').oncontextmenu = function (){
    return false;
}
