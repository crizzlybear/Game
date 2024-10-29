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
  pickupItem(bgInst, avatarInst,inventory,enemyInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      console.log("pickedup");
      // this.col = "#71ffff";
      // console.log(item);
      if(!this.pickedUp && inventory.length==0){
        if(this.key=="black"){
          enemyInst.pickedUp=true;
          enemyInst.x = this.x;
          enemyInst.y=this.y;
          this.pickedUp=true;
        }else{
          inventory.push(this.key);
          this.pickedUp=true;
        }
       
      }
    }else{
      // this.col = "#ffffff";
    }
  }
  getEnergy(bgInst, avatarInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      avatarInst.energy=1000;
      //this.col = "#808080";
      this.col = "#71ffff";
    }else{
      this.col = "#ffffff";
    }
  }
  
  animateThis(rate,startX,startY,repeatW,repeatH){
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
       //push next color
     }
  }

  animateThis2(rate,startX,startY,repeatW,repeatH){
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
       //push next color
     }
  }
}
