status = "";

function setup() {
    canvas = createCanvas(630, 640);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}
function draw() {
    image(video, 0, 0, 630, 630);
}