status = "";
objects = [];

function setup() {
    canvas = createCanvas(630, 640);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
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
        if (status != "") {
        objectDetector.detect(video, gotResult);
         for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input) {

                document.getElementById("objectfound").innerHTML = "Object Found";
                videoLiveView.stop();
                objectDetector.detect(gotResult);
            

                var synth = window.speechSynthesis;
                speak_data = "Object Mentioned Found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objectfound").innerHTML = "Object Not Found";
            }
        }
    }
}