//Classes for a 2d topdown game with fixed size background for level 1
class Avatar{
  constructor(avatarW,avatarH){
    this.avatarW = avatarW;
    this.avatarH = avatarH;
    this.testValue=1000;
  }

  getTest(){
    return this.testValue;
  }
  setTest(newTest){
    this.testValue = newTest;
  }

  drawAvatar(ctx,updateX,updateY,) {
    ctx.beginPath();
    ctx.rect(updateX, updateY, this.avatarW, this.avatarH);
    //ctx.fillStyle = "#0095DD";
    
    //ctx.fill();//enable to see hitbox
    ctx.closePath();
  }

  moveBoundaries(canvas){//replaces moveBoundaries
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
            ctx.drawImage(av,n*avDiv,0,avDiv,avH,updateX,updateY,avatarWidth,avatarHeight);//1,2,3,4=part of image you want to show //5,6,7,8 how to display
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

