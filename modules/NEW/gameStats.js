class GameStats{
    constructor(x,y,w,h,time){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.targetScore=0;
        this.targetValue=1;
        this.prevScore=0;
        this.completedTasks=0;
        this.gateIndex=0;
        this.timeLeft=time;
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
    
        let maxHealth = 1000;
        drawBar(ctx,this.x+100,this.y,this.w,this.h,"white");
        drawBar(ctx,this.x+100,this.y,Math.max((avatarInst.health/maxHealth)*this.w,0),this.h,"red");
    }

    
    drawCount(ctx,gateList){
        ctx.beginPath();
        ctx.rect(0,40,75,45);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
        ctx.closePath();

        let text = ` R:${gateList[0].score} G:${gateList[1].score} B:${gateList[2].score}`;
        ctx.font = "bold 10px Arial";
        ctx.fillStyle = "white";
        // ctx.shadowColor="transparent";
        ctx.fillText(text, 0, 51);
        
    }  
    drawObjective(ctx,gateList){
        let col = gateList[this.gateIndex].gateKeyReq;
        let text = ` ${col[0].toUpperCase()+col.slice(1).toLowerCase()}: ${this.targetScore}/${this.targetValue}`;
        let text2 = ` Completed: ${this.completedTasks}`;
        // console.log(gateList[this.gateIndex].score);
        if(gateList[this.gateIndex].score > this.prevScore){
            this.targetScore++;
        }//Needs testing
        this.prevScore = gateList[this.gateIndex].score;
        if(this.targetScore==this.targetValue){
            this.targetScore=0;
            this.completedTasks++;
            this.targetValue = Math.round(Math.random()*3);//max target goal size
            this.gateIndex = Math.round(Math.random()*2);
        }
        
        ctx.font = "bold 10px Arial";
        ctx.fillStyle =`${gateList[this.gateIndex].gateKeyReq}`;
        // ctx.shadowColor="transparent";
        ctx.fillText(text, 0, 66);
        // ctx.fillStyle = "black";
        ctx.fillText(text2, 0, 80);
    }

    countDownTimer(){
        //Has to be placed outside of game loop! 
        let t = this.timeLeft;
        let elem = document.getElementById("time");
        
        let timerId = setInterval(countdown, 1000);
        function countdown(){
          if ((t == -1)|| gameOver) {
            timeOut=true;
            elem.setAttribute("style","color:azure");
            clearTimeout(timerId);//deletes timer
          } else {
            
            let min = Math.floor(t/60);
            let sec = t%60;
            if(min==0 && sec<=30){
                elem.setAttribute("style","color:red");
            }
            elem.innerText = min+":"+String(sec).padStart(2,'0');
            t--;
            
            
          }
        //   console.log();
        }
    //   countdown();
    }

    resetScore(gateList){
        for(let i=0; i<gateList.length;i++){
            gateList[i].score=0;
        }
        this.completedTasks=0;
        this.prevScore=0;
        this.targetScore=0;
    }
      
}