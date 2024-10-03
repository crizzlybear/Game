class Enemy extends GameObjectLocked{
    constructor(ctx,x,y,w,h){
        super(ctx,x,y,w,h);
        this.ctx = ctx;
        this.col="red";
        this.newX;
        this.newY;
      }
        
      drawHorizontalMovement(bgX,bgY,maxDist){
        let ctx = this.ctx;
        ctx.beginPath();
        
        //var enemyX = (this.x++)%200-bgX;
        var enemyX = maxDist*Math.sin(this.x+=0.008)+maxDist;
        //console.log("sine:", enemyX);
        ctx.rect(enemyX-bgX,this.y-bgY, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      } 

      drawVerticalMovement(bgX,bgY,maxDist){
        let ctx = this.ctx;
        ctx.beginPath();
        //var enemyX = (this.x++)%200-bgX;
        var enemyY = maxDist*Math.sin(this.y+=0.008)+maxDist;
        this.newY = enemyY;
        //console.log("sine:", enemyX);
        ctx.rect(this.x-bgX,this.newY-bgY, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    
      drawFollow(bgX,bgY){
      let ctx = this.ctx;
      ctx.beginPath();
      
      var xDist = Math.floor(convertBGXtoAvatar(bgX)-this.x);
      var yDist = Math.floor(convertBGYtoAvatar(bgY)- this.y );
    
      var ax = this.x +=(xDist*0.01);
      var ay = this.y +=(yDist*0.01);
      this.newX = ax;
      this.newY = ay;
      ctx.rect(ax-bgX,ay-bgY, this.w, this.h);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
  }
  
    //override
    collisionObj2(bgX,bgY){
      //custom collision detection
      var ctx = this.ctx;
      let rightBorder=this.x+this.w;
      let leftBorder=this.x;
      let topBorder=this.newY;
      let botBorder=this.h+this.newY;
      if((rightBorder-bgX>avatarX)&&(botBorder-bgY>avatarY)&&(leftBorder-bgX<avatarX+avatarWidth)&&(topBorder-bgY<avatarY+avatarHeight)){
        console.log("inside");
        let collide = [Math.abs((rightBorder-bgX)-avatarX),Math.abs((botBorder-bgY)-avatarY),Math.abs((leftBorder-bgX)-(avatarX+avatarWidth)), Math.abs((topBorder-bgY)-(avatarY+avatarHeight))];
        let n=collide.indexOf(Math.min(...collide));
        console.log(collide);
        console.log("X:"+bgX +" Y:"+bgY);
        switch(n){
          case n=0:
            console.log("from right!");
            //bgX = bgX+10;
            this.col = "blue";
            changeBgX(bgX+10);
            break;
          case n=1:
            console.log("from bottom", botBorder); 
            console.log("bgY before", bgY);
            //bgY = bgY+10;
            this.col = "green";
            changeBgY(bgY+10);
            break;
          case n=2:
            console.log("from left");
            //bgX=bgX-10;
            this.col = "pink";
            changeBgX(bgX-10);
            break;
          case n=3:
            console.log("from top"); 
            this.col = "purple";
            changeBgY(bgY-10);
            break;
          default:
            console.log("nothing...");
            break;
        } //end switch
      }else{//console.log("outside");
      }
  
     
    }//end colision
    
   
}
