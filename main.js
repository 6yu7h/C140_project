song = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
	song = loadSound("Piano.mp3");
	song2 = loadSound("Violin.mp3");
}

function setup()
{
	canvas = createCanvas(600, 500);
	canvas.center();
	
	video = createCapture(VIDEO);
	video.hide();
	
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
	console.log("PoseNet is Intialised");
}

function draw()
{
	image(video, 0, 0, 600, 500);
	fill("#FF0000");
	stroke("#FF0000");
	
	song.isPlaying();
	if(scoreLeftWrist > 0.2)
		{
			circle(leftWristX, leftWristY,20);
			song2.stop();
			
			if(song == "false")
				{
					song.play();
					document.getElementById("song_name").innerHTML = "Song Name is Piano Instrumental song" + song;
				}
		}
}

function gotPoses(results)
{
	if(results.length > 0)
		{
			console.log(results);
			scoreLeftWrist = results[0].pose.keypoints[9].score;
			console.log("ScoreLeftWrist = " + scoreLeftWrist);
			
			leftWristX = results[0].pose.leftWrist.x;
			leftWristY = results[0].pose.leftWrist.y;
			console.log("left wristX = "+leftWristX+" left wristY = "+leftWristY);
			
			rightWristX = results[0].pose.rightWrist.x;
			rightWristY = results[0].pose.rightWrist.y;
			console.log("right wristX = "+rightWristX+" right wristY = "+rightWristY);
		}
}