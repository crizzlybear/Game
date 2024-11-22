
//CALLED BY HTML, RUNS UPDATE LOOP
//All document elements are here

function main(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d",{alpha: false});

  var canvasUI = document.getElementById("canvasUI");
  var ctxUI = canvasUI.getContext("2d");
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  
  console.log("PRESS JUMP TO START");
  startScreen(canvas,ctx);
  startLevel(canvas,ctx,canvasUI,ctxUI);
  // level1(canvas,ctx,canvasUI,ctxUI);
}
async function waitUntil(condition, time = 100) {
  while (!condition()) {
      await new Promise((resolve) => setTimeout(resolve, time));
  }
}
async function startLevel(canvas,ctx,canvasUI,ctxUI) {
  await waitUntil(() => spacePressed === true);
  //console.log('condition is met!');
  level1(canvas,ctx,canvasUI,ctxUI);
}

function startScreen(canvas,ctx){
  ctx.beginPath();
  ctx.fillStyle = "lightgray";
  ctx.rect(0,0,canvas.width, canvas.height);
  ctx.fill();
  ctx.closePath();
  ctx.font = `bold 20px Lucida Console`;
  ctx.fillStyle = "darkgray";
  ctx.fillText("Press Jump To Start", 120, 40);
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
  }else if(e.key===" "){
    spacePressed = true;
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
  }else if(e.key ===" "){
    spacePressed=false;
  }
}


