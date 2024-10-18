//Classes for a 2d topdown game with fixed size background for level 1

class Avatar{
  constructor(avatarX,avatarY,avatarW,avatarH){
    this.x = avatarX;
    this.y = avatarY;
    this.w = avatarW;
    this.h = avatarH;
    this.testValue=1000;
    this.i=0;
    this.speed = 2;
    this.v=0;
    this.rgbSum = [255,255,255];
    this.powerColor = "rgb(255,255,255)";
    this.health = 1000;
    this.energy = 1000;
    this.level=0;
  }

  getTest(){
    return this.testValue;
  }
  setTest(newTest){
    this.testValue = newTest;
  }

  drawAvatar(ctx,updateX,updateY) {
    //console.log("updateX:", updateX);
    ctx.beginPath();
    ctx.rect(updateX, updateY, this.w, this.h);
    //ctx.fillStyle = "#0095DD";
    
    //ctx.fill();//enable to see hitbox
    ctx.closePath();
  }

  moveBoundaries(canvas){//replaces moveBoundaries
    if (rightPressed) {
        this.x = Math.min(this.x + this.speed, canvas.width - this.w); //move 7 units right with edge
    } else if (leftPressed) {
        this.x = Math.max(this.x - this.speed, 0); 
    } else if(upPressed){
      this.y = Math.max(this.y - this.speed, 0);    
    } else if(downPressed){
      this.y = Math.min(this.y + this.speed, canvas.height - this.h);
    }
  }
 

  switchSprite(ctx, rate){ 
    
    function drawSprite(updateX,updateY,avatarW,avatarH,n){
            ctx.drawImage(av,n*avDiv,0,avDiv,avH,updateX,updateY,avatarW, avatarH);//1,2,3,4=part of image you want to show //5,6,7,8 how to display
            /*if fixed, updateX and updateY are constant,
            if moves, updateX = avatarX, updateY = avatarY. avatarX,avatarY is updated by moveFree()*/
        }
   if(rate==1){
    this.i = (this.i+1)%2;//where 2 is number of frames
   }
    if(rightPressed){//0,4
        // console.log(this.i);
        if(powerOn&&this.energy>0){
          drawSprite(this.x,this.y,this.w, this.h, this.i+12);
        }else{
          drawSprite(this.x,this.y,this.w, this.h, this.i+8);
        }
        
    }else if(leftPressed){//1,5
      // console.log("L",this.i+4);
      if(powerOn&&this.energy>0){
        drawSprite(this.x,this.y,this.w, this.h, this.i+10);
      }else{
        drawSprite(this.x,this.y,this.w, this.h, this.i+6);
      }
      // drawSprite(this.x,this.y,this.w, this.h, this.i+6);
    }else if(upPressed){//6,7
      drawSprite(this.x,this.y,this.w, this.h, this.i+2);
        
    }else if(downPressed){//2,3
        drawSprite(this.x,this.y,this.w, this.h, this.i+4);
    }else{
      drawSprite(this.x,this.y,this.w, this.h, this.i);
    }
  }


}//end Avatar

class AvatarFixed extends Avatar{
  constructor(avatarX,avatarY,avatarW,avatarH){
    super(avatarX,avatarY,avatarW,avatarH);
  }
  
 
  usePowerColorParticle(ctx){
    //maybe create another ctx to act as a mask
    
    if(powerOn&&this.energy>0){
      this.energy=this.energy-1;
      ctx.beginPath();  
      ctx.rect(this.x,this.y,10,10);
      this.v = (this.v+1)%50;
      var vv = 50-this.v;
      ctx.rect(this.x+(vv)%25,this.y+(vv)%40,10,10)
      ctx.rect(this.x-(vv)%25,this.y-(vv)%50,10,10)
      ctx.rect(this.x-(vv)%40,this.y-(vv)%30,10,10)
      ctx.rect(this.x-(-vv)%15,this.y-(vv)%40,10,10)
      // console.log(vv);
      ctx.fillStyle = this.powerColor;
      ctx.fill();
      ctx.closePath();
      
    }
    
  }


  getClosestItemColors(obsList,bgInst, rate){
    if((rightPressed||leftPressed||upPressed||downPressed)&&rate==1){
      // var dist = new Array();
      var calcX1;
      var calcX2;
      var calcY1;
      var calcY2;

      for(var i=0; i<obsList.length; i++){
            calcX1 = Math.abs((obsList[i].x - convertBGXtoAvatar(bgInst.bgX)));//maybe replace with collision in range
            calcX2 = Math.abs(obsList[i].x+obsList[i].w - convertBGXtoAvatar(bgInst.bgX));
            calcY1 = Math.abs((obsList[i].y - convertBGYtoAvatar(bgInst.bgY)));
            calcY2 = Math.abs(obsList[i].y+obsList[i].h - convertBGYtoAvatar(bgInst.bgY));
        var center = ((Math.min(calcX1,calcX2) + Math.min(calcY1,calcY2))/2);
        if((center < 150)&& !obsList[i].pickedUp){
          
          // console.log(obsList[i].rgb,i);
          this.rgbSum[0] += obsList[i].rgb[0]*3;
          this.rgbSum[1] += obsList[i].rgb[1]*3;
          this.rgbSum[2] += obsList[i].rgb[2]*3;
          // this.rgbSum[(obsList[i].rgb).indexOf((Math.max(...obsList[i].rgb)))] +=255;
          this.rgbSum[0] = Math.floor(this.rgbSum[0]/2);
          this.rgbSum[1] = Math.floor(this.rgbSum[1]/2);
          this.rgbSum[2] = Math.floor(this.rgbSum[2]/2);
          this.powerColor = `rgb(${this.rgbSum[0]},${this.rgbSum[1]},${this.rgbSum[2]})`;
          
        }else{
          
          this.rgbSum[0] = this.rgbSum[0]*2 + 255;
          this.rgbSum[1] = this.rgbSum[1]*2 + 255;
          this.rgbSum[2] = this.rgbSum[2]*2 + 255;
          // this.rgbSum[(obsList[i].rgb).indexOf((Math.max(...obsList[i].rgb)))] +=255;
          this.rgbSum[0] = Math.floor(this.rgbSum[0]/3);
          this.rgbSum[1] = Math.floor(this.rgbSum[1]/3);
          this.rgbSum[2] = Math.floor(this.rgbSum[2]/3);
          this.powerColor = `rgb(${this.rgbSum[0]},${this.rgbSum[1]},${this.rgbSum[2]})`;
          
         
        }
        // dist.push(center);
        
      }
      // console.log(dist);
      
      

    }
  }

  run(){
    if(shiftPressed){
      // console.log("running");
      this.speed = 4;
    }else{
      this.speed = 2;
    }
  }

}
