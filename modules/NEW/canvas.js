//menu

function drawText(canvas,ctx,x,y,size,col,text){
    ctx.font = `bold ${size}px Courier New`;
    ctx.fillStyle = col;
    ctx.fillText(text, x, y);
    
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



class GameStats{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    
    drawEnergyBar(ctx,energy){
        function drawBar(ctx,xx,yy,ww,hh,setCol){
            ctx.beginPath();
            ctx.rect(xx,yy,ww,hh);
            ctx.fillStyle = setCol;
            ctx.fill();
            ctx.closePath();
        }
    
        drawBar(ctx,this.x,this.y,this.w,this.h,"white");
        //console.log("eneergy",energy);
        drawBar(ctx,this.x,this.y,(energy/1000)*this.w,this.h,"green");
    }

    drawHealthBar(ctx,avatarInst){
        function drawBar(ctx,xx,yy,ww,hh,setCol){
            ctx.beginPath();
            ctx.rect(xx,yy,ww,hh);
            ctx.fillStyle = setCol;
            ctx.fill();
            ctx.closePath();
        }
    
        var maxHealth = 1000;
        drawBar(ctx,this.x+100,this.y,this.w,this.h,"white");
        drawBar(ctx,this.x+100,this.y,Math.max((avatarInst.health/maxHealth)*this.w,0),this.h,"red");
    }

    drawInventory(ctx,inventory){
        function drawItem(ctx,xx,yy,ww,hh,setCol){
            ctx.beginPath();
            ctx.rect(xx,yy,ww,hh);
            ctx.fillStyle = setCol;
            ctx.fill();
            ctx.closePath();
        }
        //console.log(inventory);
        // var invCopy = inventory.slice();
        // console.log(invCopy);
        for(var i=0; i<inventory.length; i++){
            drawItem(ctx,this.x+(i*this.w),this.y, this.w,this.h, inventory[i].color);
            // invCopy.pop();
        }
    }

}