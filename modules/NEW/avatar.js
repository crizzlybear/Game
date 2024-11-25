//Classes for a 2d topdown game with fixed size background for level 1

class Avatar{
  constructor(avatarX,avatarY,avatarW,avatarH){
    this.x = avatarX;
    this.y = avatarY;
    this.w = avatarW;
    this.h = avatarH;
      
    this.speed = 2;
    this.health = 1000;
    this.energy = 1000;
    this.isHit=false;

    this.i=0;//sprite frame index
    this.j=0;//attack frame index
    this.v=0;//particle positition
    this.rgbSum = [255,255,255];

  }

  switchSprite(ctx, rate, frameW, frameH){ 
    function drawSprite(updateX,updateY,avatarW,avatarH,n){
      ctx.drawImage(av,n*frameW,0,frameW,frameH,updateX,updateY,avatarW, avatarH);//1,2,3,4=part of image you want to show //5,6,7,8 how to display
      /*if fixed, updateX and updateY are constant,
      if moves, updateX = avatarX, updateY = avatarY. avatarX,avatarY is updated by moveFree()*/
    }
    if(rate==1){
      this.i = (this.i+1)%2;//where 2 is number of frames
    }
    if(rightPressed){//0,4
      // console.log(this.i);
      if(powerOn&&this.energy>0){
        drawSprite(this.x,this.y,this.w, this.h, this.i+2);
      }else{
        drawSprite(this.x,this.y,this.w, this.h, this.i+2);
      }
        
    }else if(leftPressed){//1,5
      // console.log("L",this.i+4);
      if(powerOn&&this.energy>0){
        drawSprite(this.x,this.y,this.w, this.h, this.i+4);
      }else{
        drawSprite(this.x,this.y,this.w, this.h, this.i+4);
      }
      // drawSprite(this.x,this.y,this.w, this.h, this.i+6);
    }else if(upPressed){//6,7
      drawSprite(this.x,this.y,this.w, this.h, this.i+4);
        
    }else if(downPressed){//2,3
        drawSprite(this.x,this.y,this.w, this.h, this.i+2);
    }else if(this.isHit){
      drawSprite(this.x-1,this.y,this.w, this.h, this.i+6);
    }else{
      drawSprite(this.x,this.y,this.w, this.h, this.i);
    }
  }


  usePowerColorParticle(ctx){
    //maybe create another ctx to act as a mask
    function drawParticles(ctx,xx,yy,ww,hh,color,vv){
      ctx.beginPath();  
      ctx.rect(xx,yy,ww,hh);   
      
      ctx.rect(xx+(vv)%25,yy+(vv)%40,5,5)
      ctx.rect(xx-(vv)%25,yy-(vv)%50,5,5)
      ctx.rect(xx-(vv)%40,yy-(vv)%30,5,5)
      ctx.rect(xx-(-vv)%15,yy-(vv)%40,5,5)

      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
    if(powerOn&&this.energy>0){
      this.energy=this.energy-1;
      this.v = (this.v+1)%50;
      let vv = 50-this.v;
      let rgbStr = `rgb(${this.rgbSum[0]},${this.rgbSum[1]},${this.rgbSum[2]})`;
      if(rightPressed || downPressed){
        drawParticles(ctx,this.x+this.w-8,this.y,8,8,rgbStr,vv);
      }else if(leftPressed || upPressed){
        drawParticles(ctx,this.x,this.y,8,8,rgbStr,vv);
      }else{
        drawParticles(ctx,this.x+this.w-8,this.y,8,8,rgbStr,vv);
      }
    }
    
  }

  getClosestItemColors(obsList,bgInst, rate){
    if(rate==1){
      // let dist = new Array();
      let calcX1;
      let calcX2;
      let calcY1;
      let calcY2;
      let avX = convertBGXtoAvatar(bgInst.bgX) + 25;
      let avY = convertBGYtoAvatar(bgInst.bgY) + 25;
      for(let i=0; i<obsList.length; i++){
          calcX1 = Math.abs((obsList[i].x - avX));//maybe replace with collision in range
          calcX2 = Math.abs(obsList[i].x+obsList[i].w - avX);
          calcY1 = Math.abs((obsList[i].y - avY));
          calcY2 = Math.abs(obsList[i].y+obsList[i].h - avY);
          let center = (((calcX1+calcX2)/2) + ((calcY1+calcY2)/2))/2;
        if((center < 80)&& !obsList[i].pickedUp && obsList[i].visible&& (obsList[i].x+50>0 && (obsList[i].x)<bgInst.bgW)){ //ADJUST CENTER to be closer to box distance and within bounds
          
          // console.log(obsList[i].rgb,i);
          this.rgbSum[0] += obsList[i].rgb[0]*3*(100/center);
          this.rgbSum[1] += obsList[i].rgb[1]*3*(100/center);
          this.rgbSum[2] += obsList[i].rgb[2]*3*(100/center);
          // this.rgbSum[(obsList[i].rgb).indexOf((Math.max(...obsList[i].rgb)))] +=255;
          this.rgbSum[0] = Math.floor(this.rgbSum[0]/(2*100/center));
          this.rgbSum[1] = Math.floor(this.rgbSum[1]/(2*100/center));
          this.rgbSum[2] = Math.floor(this.rgbSum[2]/(2*100/center));
          
        }else{
          
          this.rgbSum[0] = this.rgbSum[0]*10 + 255;
          this.rgbSum[1] = this.rgbSum[1]*10 + 255;
          this.rgbSum[2] = this.rgbSum[2]*10 + 255;
          // this.rgbSum[(obsList[i].rgb).indexOf((Math.max(...obsList[i].rgb)))] +=255;
          this.rgbSum[0] = Math.floor(this.rgbSum[0]/11);
          this.rgbSum[1] = Math.floor(this.rgbSum[1]/11);
          this.rgbSum[2] = Math.floor(this.rgbSum[2]/11);
        }
        
      }//end loop

    }
  }

  run(){
    if(shiftPressed && this.energy>0){
      // console.log("running");
      this.energy = Math.max(this.energy-1,0);
      this.speed = 4;
    }else{
      this.speed = 2;
    }
  }

  drawAttack(ctx,rate,attackImg){
    //maybe create another ctx to act as a mask
    function drawSwipe(ctx,img1,updateX,updateY,avatarW,avatarH,n){
      // console.log(n);
      ctx.drawImage(img1,n*32,0,32,32,updateX,updateY,avatarW, avatarH);//1,2,3,4=part of image you want to show //5,6,7,8 how to display
      /*if fixed, updateX and updateY are constant,
      if moves, updateX = avatarX, updateY = avatarY. avatarX,avatarY is updated by moveFree()*/
    }
    if(rate==1){
      this.j = (this.j+1)%4;//where 2 is number of frames
    
    }
    if(attackPressed){
      // if(rightPressed){
      //   drawSwipe(ctx,this.x+this.w+30,this.y+this.h/2,50,50,this.j,attackImg);
      // }else if(leftPressed){
      //   drawSwipe(ctx,this.x-30,this.y+this.h/2,50,50,this.j,attackImg);
      // }else if(upPressed){
      //   drawSwipe(this.x+this.w+30,this.y-30,50,50,this.j,attackImg);
      // }else if(downPressed){
      //   drawSwipe(ctx,this.x+this.w+30,this.y+this.h+30,50,50,this.j,attackImg);
      // }
      drawSwipe(ctx,attackImg,this.x,this.y,80,80,this.j);
      
    }
  }

  drawCarriedBox(ctx,inventoryList,boxImg){
    function drawItem(ctx,xx,yy,ww,hh){
      ctx.drawImage(boxImg,xx, yy, ww, hh );
    }
   
    if(inventoryList.length==1){
      drawItem(ctx,this.x,this.y, 30,30);
    }
  }


}//end Avatar
