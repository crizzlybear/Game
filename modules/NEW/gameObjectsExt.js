class Stairs extends GameObject{
    constructor(ctx,x,y,w,h,objColor){
        super(ctx,x,y,w,h);
        this.color=objColor;
        this.ctx = ctx;//fix extends
        this.switch=false;//imagine there is an ivisible button 
        //this.direction = direction;//starting from bottom: NE,NW,N,S
        //Test norteast stairs
    }
    drawObj_BGFixed(bgInst){//newX,newY = bgX,bgY
        //console.log("drawn object:", -newX,-newY, this.w, this.h);
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.rect(this.x-bgInst.bgX,this.y-bgInst.bgY, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        
    } 

    drawObjImgLayer(ctx,imgName,bgInst, leftOffset, topOffset, extendX, extendY){
        //height layer  
        //console.log("drawn", bgInst.bgX,bgInst.bgY);
        ctx.drawImage(imgName, this.x-bgInst.bgX+leftOffset, this.y-bgInst.bgY-topOffset, this.w+extendX, this.h+extendY);
    }


    collisionShape(bgInst, avatarInst, stairWidth){
        var aX = convertBGXtoAvatar(bgInst.bgX);
        var aY = convertBGYtoAvatar(bgInst.bgY);
        // console.log("inEQ",aY<0.2*aX+424);//working
        // console.log("inEQ",aY<0.2*aX+474);//also working
        if(aY>0.2*aX+380 && aY<0.2*aX+385 &&aX>this.x-avatarInst.w && aX<this.x+this.w){
        // console.log("On the stairs");
        let collide = [Math.abs(0.2*aX+380-aY),Math.abs(0.2*aX+385-aY),Math.abs(this.x-avatarInst.w-aX), Math.abs(this.x+this.w-aX)];
        let n=collide.indexOf(Math.min(...collide));
        switch(n){
            case n=0:
            // console.log("from top");
            bgInst.bgY = bgInst.bgY-5;
            break;
            case n=1:
            // console.log("from bottom"); 
            bgInst.bgY = bgInst.bgY+5;
            break;
            default:
            // console.log("nothing...");
            break;
        } //end switch
        }else{//console.log("outside");
        }

        if(aY>0.2*aX+465 && aY<0.2*aX+470 &&aX>this.x-avatarInst.w && aX<this.x+this.w){
        // console.log("On the stairs");
        let collide = [Math.abs(0.2*aX+465-aY),Math.abs(0.2*aX+470-aY),Math.abs(this.x-avatarInst.w-aX), Math.abs(this.x+this.w-aX)];
        let n=collide.indexOf(Math.min(...collide));
        switch(n){
            case n=0:
            // console.log("from top");
            bgInst.bgY = bgInst.bgY-5;
            break;
            case n=1:
            // console.log("from bottom"); 
            bgInst.bgY = bgInst.bgY+5;
            break;
            default:
            // console.log("nothing...");
            break;
        } //end switch
        }else{//console.log("outside");
        }

    }
}
  
  
  
class Gate extends GameObjectLocked{
    constructor(ctx,x,y,w,h,gateKeyReq){
        super(ctx,x,y,w,h,gateKeyReq);
        this.locked = true;
        this.gateKeyReq = gateKeyReq;
        this.keyTaken = false;
        this.score = 0;
    }

    unlock(bgInst,avatarInst,inventory,unlockSound){
        let rightBorder=this.x+this.w + 10;
        let leftBorder=this.x -10;
        let topBorder=this.y - 10;
        let botBorder=this.y+this.h + 10;

        if(((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){

            if(!this.locked){
            this.y = Math.max(this.y-2,10);
            }

            if( (inventory.length==1)&& (this.gateKeyReq == inventory[0]) && pickup ){
                inventory.pop();
                this.score++;
                unlockSound.play();
                console.log("@",this.gateKeyReq,":",this.score);
            }
        }
    }


}
  
  
  