class Enemy extends GameObjectLocked{
    constructor(ctx,x,y,w,h){
        super(ctx,x,y,w,h);
        this.ctx = ctx;
        this.col="red";
        this.newX;
        this.newY;
      }
        
      drawHorizontalMovement(bgInst,maxDist){
        let ctx = this.ctx;
        ctx.beginPath();
        
        //var enemyX = (this.x++)%200-bgX;
        var enemyX = maxDist*Math.sin(this.x+=0.008)+maxDist;
        //console.log("sine:", enemyX);
        ctx.rect(enemyX-bgInst.bgX,this.y-bgInst.bgY, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      } 

      drawVerticalMovement(bgInst,maxDist){
        let ctx = this.ctx;
        ctx.beginPath();
        //var enemyX = (this.x++)%200-bgX;
        var enemyY = maxDist*Math.sin(this.y+=0.008)+maxDist;
        this.newY = enemyY;
        //console.log("sine:", enemyX);
        ctx.rect(this.x-bgInst.bgX,this.newY-bgInst.bgY, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    
      drawFollow(bgInst){
      let ctx = this.ctx;
      ctx.beginPath();
      
      var xDist = Math.floor(convertBGXtoAvatar(bgInst.bgX)-this.x);
      var yDist = Math.floor(convertBGYtoAvatar(bgInst.bgY)- this.y );
    
      var ax = this.x +=(xDist*0.01);
      var ay = this.y +=(yDist*0.01);
      this.newX = ax;
      this.newY = ay;
      ctx.rect(ax-bgInst.bgX,ay-bgInst.bgY, this.w, this.h);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
  }
  
    //override
    collisionObj2(bgInst, avatarInst){
      //custom collision detection
      var ctx = this.ctx;
      let rightBorder=this.x+this.w;
      let leftBorder=this.x;
      let topBorder=this.newY;
      let botBorder=this.h+this.newY;
      if((rightBorder-bgInst.bgX>avatarX)&&(botBorder-bgInst.bgY>avatarY)&&(leftBorder-bgInst.bgX<avatarX+ avatarInst.avatarW)&&(topBorder-bgInst.bgY<avatarY+ avatarInst.avatarH)){
        console.log("inside");
        let collide = [Math.abs((rightBorder-bgInst.bgX)-avatarX),Math.abs((botBorder-bgInst.bgY)-avatarY),Math.abs((leftBorder-bgInst.bgX)-(avatarX+ avatarInst.avatarW)), Math.abs((topBorder-bgInst.bgY)-(avatarY+ avatarInst.avatarH))];
        let n=collide.indexOf(Math.min(...collide));
        console.log(collide);
        console.log("X:"+bgInst.bgX +" Y:"+bgInst.bgY);
        switch(n){
          case n=0:
            console.log("from right!");
            //bgX = bgX+10;
            this.col = "blue";
            bgInst.bgX+=10;
            break;
          case n=1:
            console.log("from bottom", botBorder); 
            console.log("bgY before", bgInst.bgY);
            //bgY = bgY+10;
            this.col = "green";
            bgInst.bgY+=10;
            break;
          case n=2:
            console.log("from left");
            //bgX=bgX-10;
            this.col = "pink";
            bgInst.bgX-=10;
            break;
          case n=3:
            console.log("from top"); 
            this.col = "purple";
            bgInst.bgY-=10;
            break;
          default:
            console.log("nothing...");
            break;
        } //end switch
      }else{//console.log("outside");
      }
  
     
    }//end colision
    
   
}
