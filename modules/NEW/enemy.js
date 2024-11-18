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
        this.isIdle = true;
        this.pickedUp=false;
      }

      drawFollow(bgInst,rate,rate2){
      let ctx = this.ctx;
      ctx.beginPath();
      var rand = Math.round(Math.random()*10);
      var xDist = Math.floor(convertBGXtoAvatar(bgInst.bgX)-this.x);
      var yDist = Math.floor(convertBGYtoAvatar(bgInst.bgY)- this.y );
    
      
      if(rate2<20){
          ax = this.x +=(xDist*0);//ENEMY SPEED default is 0.01
          ay = this.y +=(yDist*0);
         
      }else if(rate2>=20 && rate2<30){
        ax = this.x +=(xDist*0.1);//ENEMY SPEED default is 0.01
        ay = this.y +=(yDist*0.1);
      }else{
        var ax = this.x +=(xDist*0.008);//ENEMY SPEED default is 0.01
        var ay = this.y +=(yDist*0.008);
      }
      this.newX = ax;
      this.newY = ay;
 
      if(Math.round(this.newX)==Math.round(this.oldX) && Math.round(this.newY)==Math.round(this.oldX)){//checking is new position is the same as starting pos
        this.isIdle=true;
      }else{
        this.isIdle=false;
      }
      if(rate==1){
        this.i = (this.i+1)%2;//where 2 is number of frames
       }
      ctx.drawImage(en,this.i*64,0,64,64,ax-bgInst.bgX,ay-bgInst.bgY,this.w, this.h);
  }
  
    //override
    collisionObj2(bgInst, avatarInst){
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

    collisionObstacles(obsList){

      function getFromList(obsList1){
        var r = Math.floor(Math.random()*(obsList1.length));
        // console.log(r);
        var ob = obsList1[r];
        return ob;
      }
      //custom collision detection
      //console.log(this.x+this.w,this.y+this.h, ObstInst.x, ObstInst.y);
      // console.log(getFromList(obsList));
      var objectN = getFromList(obsList);
      // for(var i=0; i<obsList.length; i++){
      //   ObstInst = obsList[i];
      // }
      var eL = this.x;
      var eR = this.x+this.w;
      var eT = this.y;
      var eB = this.y+this.h;

      if(eR>objectN.x && eB>objectN.y &&eT<objectN.y+objectN.h&&eL<objectN.x+objectN.w){
        console.log("Enemey INSIDE");
        let collide = [Math.abs(eR-objectN.x),Math.abs(eB-objectN.y),Math.abs(eT-objectN.y-objectN.h),Math.abs(eL-objectN.x-objectN.w)];
        let n=collide.indexOf(Math.min(...collide));
        console.log(n);
        switch(n){
          case n=0://L
            console.log("L");
            this.x = objectN.x-this.w-5;
            // this.y=this.y*1.0005;
            break;
          case n=1://T
            console.log("T");
            this.y = objectN.y-this.h-5;
            // this.x=this.x+1;
            break;
          case n=2://B
          console.log("B"); 
          this.y = objectN.y+objectN.h+5;
            break;
          case n=3://R
          console.log("R");
          this.x = objectN.x+objectN.w+5;
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

      var aB=30;//attack border
      if((rightBorder-bgInst.bgX>avatarInst.x-aB)&&(botBorder-bgInst.bgY>avatarInst.y-aB)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w+aB)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h+aB)){
        // console.log("inside");

        let collide = [Math.abs((rightBorder-bgInst.bgX)-(avatarInst.x-aB)),Math.abs((botBorder-bgInst.bgY)-(avatarInst.y-aB)),Math.abs((leftBorder-bgInst.bgX)-(avatarInst.x+ avatarInst.w+aB)), Math.abs((topBorder-bgInst.bgY)-(avatarInst.y+ avatarInst.h+aB))];
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
              
              this.x = Math.max(this.x-2,0);
              this.health=this.health-10;
              break;
            case n=1:
              // console.log("from bottom", botBorder); 
            
              this.y = Math.max(this.y -2,0);
              this.health=this.health-5;
              break;
            case n=2:
              // console.log("from left");
              this.x = Math.min(this.x+2, bgInst.bgW);
              this.health=this.health-5;
              break;
            case n=3:
              // console.log("from top"); 
              // this.col = "purple";
              this.y = Math.min(this.y +2,bgInst.bgH);
              this.health=this.health-5;
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
