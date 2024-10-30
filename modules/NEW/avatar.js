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
      ctx.rect(this.x+(vv)%25,this.y+(vv)%40,5,5)
      ctx.rect(this.x-(vv)%25,this.y-(vv)%50,5,5)
      ctx.rect(this.x-(vv)%40,this.y-(vv)%30,5,5)
      ctx.rect(this.x-(-vv)%15,this.y-(vv)%40,5,5)
      // console.log(vv);
      ctx.fillStyle = this.powerColor;
      ctx.fill();
      ctx.closePath();
      
    }
    
  }


  getClosestItemColors(obsList,bgInst, rate){
    if(rate==1){
      // var dist = new Array();
      var calcX1;
      var calcX2;
      var calcY1;
      var calcY2;
      var avX = convertBGXtoAvatar(bgInst.bgX) + 25;
      var avY = convertBGYtoAvatar(bgInst.bgY) + 25;
      for(var i=0; i<obsList.length; i++){
            calcX1 = Math.abs((obsList[i].x - avX));//maybe replace with collision in range
            calcX2 = Math.abs(obsList[i].x+obsList[i].w - avX);
            calcY1 = Math.abs((obsList[i].y - avY));
            calcY2 = Math.abs(obsList[i].y+obsList[i].h - avY);
        var center = (((calcX1+calcX2)/2) + ((calcY1+calcY2)/2))/2;
        if((center < 90)&& !obsList[i].pickedUp && obsList[i].visible&& (obsList[i].x+50>0 && (obsList[i].x)<bgInst.bgW)){ //ADJUST CENTER to be closer to box distance and within bounds
          
          // console.log(obsList[i].rgb,i);
          this.rgbSum[0] += obsList[i].rgb[0]*3*(100/center);
          this.rgbSum[1] += obsList[i].rgb[1]*3*(100/center);
          this.rgbSum[2] += obsList[i].rgb[2]*3*(100/center);
          // this.rgbSum[(obsList[i].rgb).indexOf((Math.max(...obsList[i].rgb)))] +=255;
          this.rgbSum[0] = Math.floor(this.rgbSum[0]/(2*100/center));
          this.rgbSum[1] = Math.floor(this.rgbSum[1]/(2*100/center));
          this.rgbSum[2] = Math.floor(this.rgbSum[2]/(2*100/center));
          this.powerColor = `rgb(${this.rgbSum[0]},${this.rgbSum[1]},${this.rgbSum[2]})`;
          
        }else{
          
          this.rgbSum[0] = this.rgbSum[0]*10 + 255;
          this.rgbSum[1] = this.rgbSum[1]*10 + 255;
          this.rgbSum[2] = this.rgbSum[2]*10 + 255;
          // this.rgbSum[(obsList[i].rgb).indexOf((Math.max(...obsList[i].rgb)))] +=255;
          this.rgbSum[0] = Math.floor(this.rgbSum[0]/11);
          this.rgbSum[1] = Math.floor(this.rgbSum[1]/11);
          this.rgbSum[2] = Math.floor(this.rgbSum[2]/11);
          this.powerColor = `rgb(${this.rgbSum[0]},${this.rgbSum[1]},${this.rgbSum[2]})`;
          
         
        }
        // dist.push(center);
        
      }
      // console.log(dist);
      
      

    }
  }

  loadNear(allObj, bgInst, rate){
    //maybe not that efficient
    var calcX1;
    var calcX2;
    var calcY1;
    var calcY2;
    if(rate==1 &&(rightPressed||leftPressed||upPressed||downPressed)){
      for(var i=0; i<allObj.length; i++){
        calcX1 = Math.abs((allObj[i].x - convertBGXtoAvatar(bgInst.bgX)));//maybe replace with collision in range
        calcX2 = Math.abs(allObj[i].x+allObj[i].w - convertBGXtoAvatar(bgInst.bgX));
        calcY1 = Math.abs((allObj[i].y - convertBGYtoAvatar(bgInst.bgY)));
        calcY2 = Math.abs(allObj[i].y+allObj[i].h - convertBGYtoAvatar(bgInst.bgY));
    var center = ((Math.min(calcX1,calcX2) + Math.min(calcY1,calcY2))/2);
    if((center < 150)){
      allObj[i].color = "pink";
      allObj[i].isVisible=true;
    }else{
      allObj[i].color = "white";
      allObj[i].isVisible=false;
    }
}
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

  // carry(pickedBox,carryBox){
  //   if(pickedBox.pickedUp){
  //     console.log("carry",carryBox);
  //   }
    
  // }

}
