//menu

function drawText(canvas, ctx, text){
    ctx.font = "48px serif";
    ctx.fillStyle = "#f57bb5";
    ctx.fillText(text, 0, 115);
    
}  
function drawButton(canvas,ctx){
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



