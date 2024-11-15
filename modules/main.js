
//CALLED BY HTML, RUNS UPDATE LOOP
//All document elements are here
function main(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var canvasUI = document.getElementById("canvasUI");
  var ctxUI = canvasUI.getContext("2d");
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  
  //level1(canvas,ctx);
  //level2(canvas,ctx);
  level3(canvas,ctx,canvasUI,ctxUI);
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
  } else if (e.key ==="t"){
    console.log("t pressed");
    menu = true;
    if(menuOpen==false){
      menuOpen=true;
    }else{
      menuOpen=false;
    }
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
  }else if(e.key == "t"){
    menu=false;
  }else if(e.key ==="r"){
    attack = false;
  }else if(e.key ==="Shift"){
    shiftPressed = false;
  }
}


