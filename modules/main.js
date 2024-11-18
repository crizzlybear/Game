
//CALLED BY HTML, RUNS UPDATE LOOP
//All document elements are here

function countDownTimer(){
  var timeLeft = 60;
  var elem = document.getElementById("time");
  
  var timerId = setInterval(countdown, 1000);
  
  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
    } else {
      elem.innerText = timeLeft + ' seconds remaining';
      timeLeft--;
    }
  }

}

function main(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d",{alpha: false});

  var canvasUI = document.getElementById("canvasUI");
  var ctxUI = canvasUI.getContext("2d");
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  
  countDownTimer();
  //level1(canvas,ctx);
  //level2(canvas,ctx);
  level1(canvas,ctx,canvasUI,ctxUI);
}
//KEY CONTROLS
function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
    // document.getElementById("score").innerText=score++;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  } else if (e.key ==="Up" || e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key ==="Down" || e.key === "ArrowDown"){
    downPressed = true;
  } else if (e.key ==="e"){
    pickup = true;
    powerOn = true;
  }else if(e.key ==="r"){
    attack = true;
  }else if(e.key ==="Shift"){
    // console.log("S");
    shiftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  } else if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = false;
    // /jump = false;
  } else if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = false;
    
  } else if(e.key === "e"){
    pickup = false;
    powerOn = false;
  }else if(e.key ==="r"){
    attack = false;
  }else if(e.key ==="Shift"){
    shiftPressed = false;
  }
}


