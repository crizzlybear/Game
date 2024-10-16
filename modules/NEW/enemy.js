class Enemy extends GameObjectLocked{
    constructor(ctx,x,y,w,h){
        super(ctx,x,y,w,h);
        this.ctx = ctx;
        this.col="red";
        this.newX;
        this.newY;
        this.i=0;
        this.oldX  = x;
        this.oldY = y;
        this.health = 200;
        this.damage = 2;
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
    
      drawFollow(bgInst,rate){
      let ctx = this.ctx;
      ctx.beginPath();
      
      var xDist = Math.floor(convertBGXtoAvatar(bgInst.bgX)-this.x);
      var yDist = Math.floor(convertBGYtoAvatar(bgInst.bgY)- this.y );
    
      if(Math.abs(xDist)<80 && Math.abs(yDist)<80){//default 200,200
        // console.log("IN RANGE");
        this.col = "orange";
      
       }else{ 
        // console.log("OUT RANGE");
        this.col="pink";
        //move towards starting position
          xDist = Math.floor(this.oldX- this.x);
          yDist = Math.floor(this.oldY- this.y );
       }
      
      var ax = this.x +=(xDist*0.008);//ENEMY SPEED default is 0.01
      var ay = this.y +=(yDist*0.008);
      this.newX = ax;
      this.newY = ay;
      // ctx.rect(ax-bgInst.bgX,ay-bgInst.bgY, this.w, this.h);
      // ctx.fillStyle = this.color;
      // ctx.fill();
      // ctx.closePath();
      if(rate==1){
        this.i = (this.i+1)%2;//where 2 is number of frames
       }
      ctx.drawImage(en,this.i*64,0,64,64,ax-bgInst.bgX,ay-bgInst.bgY,this.w, this.h);
  }
  
    //override
    collisionObj2(bgInst, avatarInst){
      //custom collision detection
      var ctx = this.ctx;
      let rightBorder=this.x+this.w;
      let leftBorder=this.x;
      let topBorder=this.newY;
      let botBorder=this.h+this.newY;
      if((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h)){
        // console.log("inside");
        let collide = [Math.abs((rightBorder-bgInst.bgX)-avatarInst.x),Math.abs((botBorder-bgInst.bgY)-avatarInst.y),Math.abs((leftBorder-bgInst.bgX)-(avatarInst.x+ avatarInst.w)), Math.abs((topBorder-bgInst.bgY)-(avatarInst.y+ avatarInst.h))];
        let n=collide.indexOf(Math.min(...collide));
        // console.log(collide);
        // console.log("X:"+bgInst.bgX +" Y:"+bgInst.bgY);
        switch(n){
          case n=0:
            // console.log("from right!");
            //bgX = bgX+10;
            this.col = "blue";
            bgInst.bgX+=10;
            break;
          case n=1:
            // console.log("from bottom", botBorder); 
            // console.log("bgY before", bgInst.bgY);
            //bgY = bgY+10;
            this.col = "green";
            bgInst.bgY+=10;
            break;
          case n=2:
            // console.log("from left");
            //bgX=bgX-10;
            this.col = "pink";
            bgInst.bgX-=10;
            break;
          case n=3:
            // console.log("from top"); 
            this.col = "purple";
            bgInst.bgY-=10;
            break;
          default:
            // console.log("nothing...");
            break;
        } //end switch
      }else{//console.log("outside");
      }
  
     
    }//end colision

    collisionObstacles(bgInst, ObstInst, obsList){

      function getFromList(obsList1){
        var r = Math.floor(Math.random()*(obsList1.length));
        // console.log(r);
        var ob = obsList1[r];
        return ob;
      }
      //custom collision detection
      //console.log(this.x+this.w,this.y+this.h, ObstInst.x, ObstInst.y);
      // console.log(getFromList(obsList));
      ObstInst = getFromList(obsList);
      // for(var i=0; i<obsList.length; i++){
      //   ObstInst = obsList[i];
      // }
      var eL = this.x;
      var eR = this.x+this.w;
      var eT = this.y;
      var eB = this.y+this.h;

      if(eR>ObstInst.x && eB>ObstInst.y &&eT<ObstInst.y+ObstInst.h&&eL<ObstInst.x+ObstInst.w){
        console.log("Enemey INSIDE");
        let collide = [Math.abs(eR-ObstInst.x),Math.abs(eB-ObstInst.y),Math.abs(eT-ObstInst.y-ObstInst.h),Math.abs(eL-ObstInst.x-ObstInst.w)];
        let n=collide.indexOf(Math.min(...collide));
        console.log(n);
        switch(n){
          case n=0://L
            console.log("L");
            this.x = ObstInst.x-this.w-5;
            // this.y=this.y*1.0005;
            break;
          case n=1://T
            console.log("T");
            this.y = ObstInst.y-this.h-5;
            // this.x=this.x+1;
            break;
          case n=2://B
          console.log("B"); 
          this.y = ObstInst.y+ObstInst.h+5;
            break;
          case n=3://R
          console.log("R");
          this.x = ObstInst.x+ObstInst.w+5;
          // this.y = this.y*1.005;
            break;
          default:
            break;
        }
      }else{
        // console.log("OUT");
      }
  
     
    }//end colision
    
      isAttacked(bgInst, avatarInst){
      //custom collision detection
      
      let rightBorder=this.x+this.w;
      let leftBorder=this.x;
      let topBorder=this.newY;
      let botBorder=this.h+this.newY;
      if((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h)){
        // console.log("inside");

        let collide = [Math.abs((rightBorder-bgInst.bgX)-avatarInst.x),Math.abs((botBorder-bgInst.bgY)-avatarInst.y),Math.abs((leftBorder-bgInst.bgX)-(avatarInst.x+ avatarInst.w)), Math.abs((topBorder-bgInst.bgY)-(avatarInst.y+ avatarInst.h))];
        let n=collide.indexOf(Math.min(...collide));
        // console.log(collide);
        // console.log("X:"+bgInst.bgX +" Y:"+bgInst.bgY);
        avatarInst.health = avatarInst.health-this.damage;
        // console.log("avatar health",avatarInst.health,"Enemy health", this.health);
        if(attack){
          // console.log("attacking!");
          
          switch(n){
            case n=0:
              // console.log("from right!");
              
              this.x = Math.max(this.x-20,0);
              this.health=this.health-10;
              break;
            case n=1:
              // console.log("from bottom", botBorder); 
            
              this.y = Math.max(this.y -20,0);
              this.health=this.health-10;
              break;
            case n=2:
              // console.log("from left");
              this.x = Math.min(this.x+20, 1020);
              this.health=this.health-10;
              break;
            case n=3:
              // console.log("from top"); 
              // this.col = "purple";
              this.y = Math.min(this.y +20,630);
              this.health=this.health-10;
              break;
            default:
              // console.log("nothing...");
              break;
          } //end switch
        }else{//console.log("outside");
        }
      }
    }
    
    enemyHealthBar(ctx,bgInst){
      var maxHealth = 200;
      ctx.beginPath();
      ctx.rect(this.x-bgInst.bgX, this.y-5-bgInst.bgY, this.w, 5);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();      
      ctx.rect(this.x-bgInst.bgX, this.y-5-bgInst.bgY, this.w*(this.health/maxHealth),5);
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fill();
      ctx.closePath();
    }
   
}
