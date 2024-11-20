
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
    ctx.font = `bold ${size}px Lucida Console`;
    ctx.fillStyle = col;
    ctx.fillText(text, x, y);
    
}  