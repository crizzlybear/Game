
function convertBGYtoAvatar(bgY){
    //avatarRelative position
    var translated=bgY+160; 
    return translated;
}
  
function convertBGXtoAvatar(bgX){
     //avatarRelative position
    var translated=bgX+240; 
    return translated;
}
  
function setShadow(ctx){
    ctx.shadowColor = "rgb(59, 55, 71)";
    ctx.shadow = 2;//instead of ctx.shadowBlur
    ctx.shadowOffsetY = 5;
}

  //menu

function drawText(ctx,x,y,size,col,text){
    ctx.font = `bold ${size}px Courier New`;
    ctx.fillStyle = col;
    ctx.fillText(text, x, y);
    
}  

function drawButton(ctx){
    ctx.beginPath();
    ctx.rect(100, 100, 100, 30);
    ctx.fillStyle = "#5f949f";
    ctx.fill();
    ctx.closePath();
}

function drawMenu(canvas,ctx) {
    
    ctx.beginPath();
    ctx.rect(canvas.width*0.1, canvas.height*0.1, canvas.width*0.8, canvas.height*0.8);
    ctx.fillStyle = "#e1ddc3";
    ctx.fill();
    ctx.closePath();
    
}
//make this a class actually
function buttonConstructor(canvas,ctx){
    //CONTINUE HERE
}


function openMenu(canvas,ctx){
    
    if(menuOpen==true){
        drawMenu(canvas,ctx);
        drawButton(canvas,ctx);
        drawText(canvas,ctx,"click here");
    }
}