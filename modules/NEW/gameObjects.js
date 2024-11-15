//Classes for a 2d topdown game with fixed size background for level 1
class GameObjectLocked extends GameObject{
  constructor(ctx,x,y,w,h,objColor){
    super(ctx,x,y,w,h);
    this.color=objColor;
    this.ctx = ctx;//fix extends
    this.visible = false;
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

  collisionObj(bgInst, avatarInst){
    //custom collision detection
    let rightBorder=this.x+this.w;
    let leftBorder=this.x;
    let topBorder=this.y;
    let botBorder=this.y+this.h;
    if((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h)){
      console.log("inside");
      let collide = [Math.abs((rightBorder-bgInst.bgX)-avatarInst.x),Math.abs((botBorder-bgInst.bgY)-avatarInst.y),Math.abs((leftBorder-bgInst.bgX)-(avatarInst.x+ avatarInst.w)), Math.abs((topBorder-bgInst.bgY)-(avatarInst.y+ avatarInst.h))];
      let n=collide.indexOf(Math.min(...collide));
      console.log(collide);
      console.log("X:"+bgInst.bgX +" Y:"+bgInst.bgY);
      switch(n){
        case n=0:
          console.log("from right");
          bgInst.bgX = bgInst.bgX+10;
          break;
        case n=1:
          console.log("from bottom"); 
          bgInst.bgY = bgInst.bgY+10;
          break;
        case n=2:
          console.log("from left");
          bgInst.bgX=bgInst.bgX-10;
          break;
        case n=3:
          console.log("from top"); 
          bgInst.bgY = bgInst.bgY-10;
          break;
        default:
          console.log("nothing...");
          break;
      } //end switch
    }else{//console.log("outside");
    }

   
  }//end colision

}



class GameObjectInteractableLocked extends GameObjectLocked{
  constructor(ctx,x,y,w,h,rgb,key){
    super(ctx,x,y,w,h,"#ffffff");
    this.ctx = ctx;
    this.rgb = rgb;
    this.key = key;
    this.visible=true;
    this.frameW=0;
    this.energy=500;
  }
  setNewRGBandColor(){
    var rgbList = [[255,0,0],[0,255,0],[0,0,255],[0,0,0]];
    var colorList = ["red","green","blue","black"];
    var index = Math.floor(Math.random()*4);
    this.rgb = rgbList[index];
    this.key=colorList[index];
  }
  pickup(bgInst, avatarInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      console.log("pickedup");
      this.color = "#71ffff";
    }else{
      this.color = "#ffffff";
    }
  }
  pickupItem(bgInst, avatarInst,inventory,enemyInst,enemyAudio, boxAudio){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      console.log("pickedup");
     boxAudio.play();
      // console.log(item);
      if(!this.pickedUp && inventory.length==0){
        if(this.key=="black"){
          enemyInst.pickedUp=true;
          enemyInst.health=200;
          enemyInst.x = this.x;
          enemyInst.y=this.y;
          enemyAudio.play();
          
          this.pickedUp=true;
        }else{
          inventory.push(this.key);
          this.pickedUp=true;
        }
        
      }
    }else{
      this.col=this.key;//COLOR DEBUGGING
      
    }
  }
  getEnergy(bgInst, avatarInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    let randomPositions = [[0,50],[400,80],[380,220],[200,510],[300,550]];
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      this.energy = Math.max(this.energy-150,0);
      avatarInst.energy = Math.min(avatarInst.energy+10,1000);

      //this.col = "#808080";
      this.col = "#71ffff";
      this.frameW=30;
      
      if(this.energy==0){
        var coord = Math.round(Math.random()*(randomPositions.length-1));
        this.x = randomPositions[coord][0];
        this.y=randomPositions[coord][1];
        this.energy=500;
      }
      
    }else{
      // this.frameW=30;
      this.frameW=0;
      this.col = "#ffffff";
    }
  }
  
  animateLPath(rate,startX,startY,repeatW,repeatH){
    if(rate==1){ 
      if(this.x >repeatW-this.w){
        this.y=(this.y+2);
        this.x+=0;
        if(this.y>repeatH){this.x=startX;this.y=startY;
          this.setNewRGBandColor();
          this.visible=true;
        }
      }else{
        this.x = (this.x+2);
      }
     }
     if(this.pickedUp){
       //this.x =startX;
       //this.y=startY;
       this.pickedUp = false;
       this.visible=false;
       this.rbg=[255,255,255];
       //push next color
     }
  }

  animateLPathReverse(rate,startX,startY,repeatW,repeatH){
    if(rate==1){

      if(this.x <repeatW-this.w){
        this.y=(this.y-2);
        this.x+=0;
        if(this.y<repeatH){this.x=startX;this.y=startY;
          this.setNewRGBandColor();
          this.visible=true;
        }
      }else{
        this.x = (this.x-2);
      }
     }
     if(this.pickedUp){
      //  this.x =startX;
      //  this.y=startY;
       this.pickedUp = false;
       this.visible=false;
       this.rbg=[255,255,255];
       //push next color
     }
  }


  drawItemImg(ctx,imgName,bgInst,frameW,frameH){
    //height layer  
    //console.log("drawn", bgInst.bgX,bgInst.bgY);
    // this.frameW=30;
    var imgW = this.w;
    var imgH = this.h;

    if(this.frameW!=0){
      imgW=  this.w*((0.5+this.energy/500));
      imgH = this.h*((0.5+this.energy/500));
    }
    ctx.drawImage(imgName,0+this.frameW,0,frameW,frameH, this.x-bgInst.bgX, this.y-bgInst.bgY, imgW, imgH);
   
  }

}
