
//CALLED BY HTML, RUNS UPDATE LOOP
//All document elements are here

function main(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d",{alpha: false});

  var canvasUI = document.getElementById("canvasUI");
  var ctxUI = canvasUI.getContext("2d");
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  
  // console.log("PRESS JUMP TO START");
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
  
  //draw controls
  ctx.strokeStyle="white";
  ctx.strokeRect(100-10,200,25,25);
  drawText(ctx,105-10,220,20,"White","E");
  drawText(ctx,82,240,10,"darkgray","PICKUP");
  drawText(ctx,80,255,10,"darkgray","/SNIFF");
  
  ctx.strokeRect(145,200,25,25);
  drawText(ctx,150,220,20,"White","R");
  drawText(ctx,138,240,10,"darkgray","ATTACK");

  ctx.strokeRect(200,200,70,25);
  drawText(ctx,203,220,20,"White","Shift");
  drawText(ctx,225,240,10,"darkgray","RUN");

  ctx.strokeRect(300,200,25,25);
  drawText(ctx,305,218,20,"White","<");
  ctx.strokeRect(330,200,25,25);
  drawText(ctx,335,218,20,"White","v");
  drawText(ctx,330,240,10,"darkgray","MOVE");
  ctx.strokeRect(360,200,25,25);
  drawText(ctx,365,218,20,"White",">");
  ctx.strokeRect(330,170,25,25);
  drawText(ctx,335,188,20,"White","^");
  ctx.stroke();
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
      attackPressed = true;
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
      attackPressed = false;
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


