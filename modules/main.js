
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
  document.getElementById("logo").style.display='none';
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
  ctx.fillText("Press Jump To Start", 120, 150);
}
//KEY CONTROLS
function keyDownHandler(e) {

  switch(e.key){
    case ("ArrowRight"):
      rightPressed = true;
      break;
    case ("ArrowLeft"):
      leftPressed = true;
      break;
    case ("ArrowUp"):
      upPressed = true;
      break;
    case ("ArrowDown"):
      downPressed = true;
      break;
    case ("e"):
      pickup = true;
      powerOn = true;
      break;
    case ("r"):
      attack = true;
      break;
    case ("Shift"):
      shiftPressed = true;
      break;
    case (" "):
      spacePressed = true;
      break;
    default:
      break;
  }
}

function keyUpHandler(e) {
  switch(e.key){
    case ("ArrowRight"):
      rightPressed = false;
      break;
    case ("ArrowLeft"):
      leftPressed = false;
      break;
    case ("ArrowUp"):
      upPressed = false;
      break;
    case ("ArrowDown" ):
      downPressed = false;
      break;
    case ("e"):
      pickup = false;
      powerOn = false;
      break;
    case ("r"):
      attack = false;
      break;
    case ("Shift"):
      shiftPressed = false;
      break;
    case (" "):
      spacePressed=false;
      break;
    default:
      break;
  }
}


