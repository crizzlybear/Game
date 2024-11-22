
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

function drawTextOutline(ctx,x,y,size,col,text){
    ctx.font = `bold ${size}px Lucida Console`;
    ctx.strokeStyle=col;
    ctx.lineWidth=3;
    // ctx.fillText(text, x, y);
    ctx.strokeText(text,x,y);
    ctx.fillStyle = "black";
    ctx.fillText(text,x,y);
}  
function drawText(ctx,x,y,size,col,text){
    ctx.font = `bold ${size}px Lucida Console`;
    ctx.fillStyle = col;
    ctx.fillText(text, x, y);
    
}  

function updateHighscore(ctx,x,y,size,col,nCompleted){
    var hsText;
    if(nCompleted>highscore){
        hsText = `Highscore: ${nCompleted} NEW!`;
        highscore = nCompleted;
        console.log("FIX HIGHSCORE!!");
    }else{
        hsText = `Highscore: ${highscore}`;
    }
    drawText(ctx,x,y,size,col,hsText);
    drawText(ctx,x,y+40,size*0.5,col,"Press Jump To Play Again");
}