//Classes for a 2d topdown game with fixed size background for level 1
class Avatar{
  constructor(posX,posY,avatarW,avatarH){
    this.posX = posX;
    this.posY = posY;
    this.avatarW = avatarW;
    this.avatarH = avatarH;
  }
  drawAvatar(ctx,updateX,updateY,) {
    ctx.beginPath();
    ctx.rect(updateX, updateY, this.avatarW, this.avatarH);
    //ctx.fillStyle = "#0095DD";
    
    //ctx.fill();//enable to see hitbox
    ctx.closePath();
  }

  moveFree(canvas){//replaces moveBoundaries
    if (rightPressed) {
        avatarX = Math.min(avatarX + speed, canvas.width - avatarWidth); //move 7 units right with edge
    } else if (leftPressed) {
        avatarX = Math.max(avatarX - speed, 0); 
    } else if(upPressed){
        avatarY = Math.max(avatarY -speed, 0);    
    } else if(downPressed){
        avatarY = Math.min(avatarY +speed, canvas.height - avatarHeight);
    }
}
  switchSprite(ctx,updateX,updateY){ 
    function drawSprite(n){
            ctx.drawImage(av,n*avDiv,0,avDiv,avH,updateX,updateY,20,20);//1,2,3,4=part of image you want to show //5,6,7,8 how to display
            /*if fixed, updateX and updateY are constant,
            if moves, updateX = avatarX, updateY = avatarY. avatarX,avatarY is updated by moveFree()*/
        }
    if(rightPressed){
        drawSprite(0);
        last =0;
    }else if(leftPressed){
        drawSprite(1);
        last =1;
    }else if(upPressed){
        drawSprite(2);
        last =2;
    }else if(downPressed){
        drawSprite(3);
        last =3;
    }else{
        drawSprite(last);
    }
  }
}//end Avatar

class GameObject{
  //constructor
  constructor(ctx,x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color="#FFFFFF";
    this.ctx = ctx;
  } 
  //getters
  get pos(){
    console.log(this.x,",",this.y);
  }
  set col(c){
    this.color = c;
  }
  
  //methods
  drawObj(){
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    //this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawImg(){
    this.ctx.drawImage(ob, this.x, this.y, this.w, this.h);
  }

  collisionObj(){
    //custom collision detection
    if(avatarX+avatarWidth>this.x && avatarY+avatarHeight>this.y && avatarY<(this.y+this.h) && avatarX<(this.x+this.w))
        {
          let collide = [Math.abs(this.x-(avatarX+avatarWidth)), Math.abs((this.x+this.w)-(avatarX)), Math.abs(this.y-(avatarY+avatarHeight)), Math.abs(avatarY-(this.y+this.h))];
          let n=collide.indexOf(Math.min(...collide));
          switch(n){
            case n=0:
              console.log("from left");
              avatarX=this.x-avatarWidth;
              break;
            case n=1:
              console.log("from right");
              avatarX=this.x+this.w;
              break;
            case n=2:
              console.log("from top");
              avatarY=this.y-avatarHeight;
              
              console.log("TOP HIT");
              break;
            case n=3:
              console.log("from bottom");
              avatarY=this.y+this.h;
              bump = this.y+this.h;
              break;
            default:
              console.log("nothing...");
              break;
          } //end switch
        }//end if
  }//end colision
  
  //wrappers
  createObj(){
    this.drawObj();
    this.collisionObj();
  }
}//end class


class GameObjectInteractable extends GameObject{
  constructor(ctx){
      super();
      this.ctx = ctx;
  }
  pickupObj(){
      //custom collision detection
      //has to be above draw()
      if(avatarX+20+5>this.x && avatarY+20+5>this.y && avatarY<(this.y+this.h+5) && avatarX<(this.x+this.w+5))
          {
            if(pickup){
              console.log("pickedup");
              this.col = "#808080";
            }
          }//end if
    }//end colision

  
  createInteractable(){//var cannot be onst
    this.pickupObj();
    this.drawObj();
    this.collisionObj();
  }

 
}

class BG{
  constructor(bgSrc){
    this.bgSrc = bgSrc;
    background.src = this.bgSrc;
  }
  set newBG(newSrc){
    this.bgSrc = newSrc;
    background.src = this.bgSrc;
  }
  drawBG(canvas,ctx){
    //default full image
    ctx.drawImage(background, 0,0, canvas.width, canvas.height);
    
  }

}

class Enemy{
  constructor(startX,startY,enemyW,enemyH){
    this.posX = startX;
    this.posY = startY;
    this.enemyW = enemyW;
    this.enemyH = enemyH;
  }
  drawEnemies(ctx, XX,YY) {
    ctx.beginPath();
    ctx.rect(XX, YY, this.enemyW, this.enemyH);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
  }

}
