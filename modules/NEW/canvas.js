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



class GameStats{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.targetScore=0;
        this.targetValue=1;
        this.prevScore=0;
        this.completedTasks=0;
        this.gateIndex=0;
    }

    
    drawEnergyBar(ctx,avatarInst){
        function drawBar(ctx,xx,yy,ww,hh,setCol){
            ctx.beginPath();
            ctx.rect(xx,yy,ww,hh);
            ctx.fillStyle = setCol;
            ctx.fill();
            ctx.closePath();
        }
    
        drawBar(ctx,this.x,this.y,this.w,this.h,"white");
        //console.log("eneergy",energy);
        drawBar(ctx,this.x,this.y,(avatarInst.energy/1000)*this.w,this.h,"green");
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
       
        for(var i=0; i<inventory.length; i++){
            drawItem(ctx,this.x+(i*this.w),this.y, this.w,this.h, inventory[0]);
        }
    }
    
    
    drawCount(ctx,gateList){
        var text = `R:${gateList[0].score} G:${gateList[1].score} B:${gateList[2].score}`;
        ctx.font = "bold 10px Arial";
        ctx.fillStyle = "black";
        ctx.shadowColor="transparent";
        ctx.fillText(text, 0, 50);
        
    }  
    drawObjective(ctx,gateList){
        var text = `${gateList[this.gateIndex].gateKeyReq}: ${this.targetScore}/${this.targetValue}`;
        var text2 = `Completed: ${this.completedTasks}`;
        if(gateList[this.gateIndex].score > this.prevScore){
            this.targetScore++;
        }
        this.prevScore = gateList[this.gateIndex].score;
        if(this.targetScore==this.targetValue){
            this.completedTasks++;
            this.targetScore=0;
            this.targetValue = Math.round(Math.random()*5);
            this.gateIndex = Math.round(Math.random()*2);
        }
        
        ctx.font = "bold 10px Arial";
        ctx.fillStyle = "red";
        ctx.shadowColor="transparent";
        ctx.fillText(text, 0, 70);
        ctx.fillText(text2, 0, 80);
    }
}