video = "";
object =[];
status = "";
object_name = "";
 
function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(480,300);
    canvas.center();
}

    
function draw()
{
    image(video,0,0,480,300);
     if(status != "")
     {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + object.length;

            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%" , object[i].x + 15 , object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x , object[i].y, object[i].width, object[i].height);
            if (object[i].label == object_name)
            {
                video.stop();
                document.getElementById("status").innerHTML = "Status : Object is found";
            }
        }
     } 
}

function gotResult(error , results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object").value;
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(3);
    video.volume(0);
}

