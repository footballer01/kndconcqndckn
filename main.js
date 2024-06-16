song = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;

function preload()
    {

      song = loadSound('music.mp3');

    }



function setup()
{
     

    video = createCapture(VIDEO);
    video.hide();

     model = ml5.poseNet(video,modelLoaded);
     model.on('pose',gotPoses);

}

function modelLoaded()
{
console.log('model has loaded');

}

function gotPoses(results)
{

if (results.length > 0) {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score
    scoreLeftWrist = results[0].pose.keypoints[9].score
    console.log('scoreRightWrist = ' + scoreRightWrist + 'scoreLeftWrist = ' + scoreLeftWrist);

    lwx = results[0].pose.leftWrist.x;
    lwy = results[0].pose.leftWrist.y;
    console.log('X position of my left wrist is =', lwx);
    console.log('Y position of my left wrist is =',lwy);
    
    rwx = results[0].pose.rightWrist.x;
    rwy = results[0].pose.rightWrist.y;
    console.log('X position of my right wrist is =', rwx);
    console.log('Y position of my right wrist is =',rwy);
}

}

function draw()
{
  image(video,0,0,600,500);

  fill ('red');
  stroke('red');

circle (rwx,rwy,20);

 if (scoreRightWrist > 0.2) 
 {
  if (rwy > 0 && rwy <= 100) {
    document.getElementById('speed').innerHTML = "speed = 0.5x"
    song.rate(0.5);
  }
   else if (rwy > 100 && rwy <= 200) {
    document.getElementById('speed').innerHTML = "speed = 1x"
    song.rate(1);
  }
   else if (rwy > 200 && rwy <= 300) {
    document.getElementById('speed').innerHTML = "speed = 1.5x"
    song.rate(1.5);
  }
  else if (rwy > 300 && rwy <= 400) {
    document.getElementById('speed').innerHTML = "speed = 2x"
    song.rate(2);
  }
  else if (rwy > 400 && rwy <= 500) {
   document.getElementById('speed').innerHTML = "speed = 2x"
   song.rate(2);
  } 
 }

if (scoreLeftWrist > 0.2) {
  circle(lwx,lwy,20);
  InNumberLeftWristY = Number(lwy);
  remove_decimals = floor(InNumberLeftWristY);
  volume = remove_decimals/500;
  document.getElementById('volume').innerHTML = "volume =" + volume;
  song.setVolume(volume);
}


}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1)
}
function stop()
    {
      song.stop();
    }
 