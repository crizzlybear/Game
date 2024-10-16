//Classes for a 2d topdown game with fixed size background for level 1
class GameObject{
  //constructor
  constructor(ctx,x,y,w,h, rgb){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color="#FFFFFF";
    this.ctx = ctx;
    this.rgb = rgb;
    this.pickedUp=false;
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
  pickupObj(avatarInst){
      //custom collision detection
      //has to be above draw()
      //if(avatarInst.x+20+5>this.x && avatarY+20+5>this.y && avatarY<(this.y+this.h+5) && avatarInst.avatarX<(this.x+this.w+5))
      if(avatarInst.x+avatarInst.w>this.x && avatarInst.y+avatarInst.h>this.y && avatarInst.y<(this.y+this.h) && avatarInst.x<(this.x+this.w))
          {
            if(pickup){
              console.log("pickedup");
              this.setCol = "#808080";
            }
          }//end if
    }//end colision

  
  createInteractable(){//var cannot be onst
    this.pickupObj();
    this.drawObj();
    this.collisionObj();
  }

 
}


class GameObjectLocked extends GameObject{
  constructor(ctx,x,y,w,h,objColor,rgb){
    super(ctx,x,y,w,h);
    this.color=objColor;
    this.ctx = ctx;//fix extends
    this.rgb = rgb;
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

  animateThis(rate){
    var w2 = this.w;
    if(rate==1){
     
     (this.x+=5)%200;
    }
    
      let ctx = this.ctx;
     ctx.beginPath();
     ctx.rect((this.x)%260,this.y, w2, this.h);
     ctx.fillStyle = this.color;
     ctx.fill();
     ctx.closePath();
  }
  
}



class GameObjectInteractableLocked extends GameObjectLocked{
  constructor(ctx,x,y,w,h,rgb){
    super(ctx,x,y,w,h,rgb);
    this.ctx = ctx;
    this.col="#ffffff";
    this.rgb = rgb;
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
      this.col = "#71ffff";
    }else{
      this.col = "#ffffff";
    }
  }
  pickupItem(bgInst, avatarInst,inventory,item){
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
      if(!this.pickedUp){
        inventory.push(item);
        this.rgb = [255,255,255];
        this.pickedUp=true;
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
      energy=1000;
      //this.col = "#808080";
      this.col = "#71ffff";
    }else{
      this.col = "#ffffff";
    }
  }
  

}


class Stairs extends GameObject{
  constructor(ctx,x,y,w,h,objColor){
    super(ctx,x,y,w,h);
    this.color=objColor;
    this.ctx = ctx;//fix extends
    this.switch=false;//imagine there is an ivisible button 
    //this.direction = direction;//starting from bottom: NE,NW,N,S
    //Test norteast stairs
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
      // console.log("inside");
      
      
      
          // if(leftPressed){
          //   bgInst.bgX = bgInst.bgX-1;
          //   bgInst.bgY = bgInst.bgY-0.5;
          //   avatarInst.level=1;
          // }else if(rightPressed){
          //   bgInst.bgX = bgInst.bgX+1;
          //   bgInst.bgY = bgInst.bgY+0.5;
          //   avatarInst.level=0;
          // }
          
       
    
    }else{//console.log("outside");
    }

   
  }//end colision

  collisionShape(bgInst, avatarInst, stairWidth){
    var aX = convertBGXtoAvatar(bgInst.bgX);
    var aY = convertBGYtoAvatar(bgInst.bgY);
    // console.log("inEQ",aY<0.2*aX+424);//working
    // console.log("inEQ",aY<0.2*aX+474);//also working
    if(aY>0.2*aX+380 && aY<0.2*aX+385 &&aX>this.x-avatarInst.w && aX<this.x+this.w){
      // console.log("On the stairs");
      let collide = [Math.abs(0.2*aX+380-aY),Math.abs(0.2*aX+385-aY),Math.abs(this.x-avatarInst.w-aX), Math.abs(this.x+this.w-aX)];
      let n=collide.indexOf(Math.min(...collide));
      switch(n){
        case n=0:
          console.log("from top");
          bgInst.bgY = bgInst.bgY-5;
          break;
        case n=1:
          console.log("from bottom"); 
          bgInst.bgY = bgInst.bgY+5;
          break;
        default:
          console.log("nothing...");
          break;
      } //end switch
    }else{//console.log("outside");
    }

    if(aY>0.2*aX+465 && aY<0.2*aX+470 &&aX>this.x-avatarInst.w && aX<this.x+this.w){
      // console.log("On the stairs");
      let collide = [Math.abs(0.2*aX+465-aY),Math.abs(0.2*aX+470-aY),Math.abs(this.x-avatarInst.w-aX), Math.abs(this.x+this.w-aX)];
      let n=collide.indexOf(Math.min(...collide));
      switch(n){
        case n=0:
          console.log("from top");
          bgInst.bgY = bgInst.bgY-5;
          break;
        case n=1:
          console.log("from bottom"); 
          bgInst.bgY = bgInst.bgY+5;
          break;
        default:
          console.log("nothing...");
          break;
      } //end switch
    }else{//console.log("outside");
    }

    if(aY>0.2*aX+380 && aY<0.2*aX+465 &&aX>this.x-avatarInst.w && aX<this.x+this.w){
      // var bgX1 = bgInst.bgX  
      // console.log("x",bgX1,bgInst.bgX);
        if(leftPressed){
          bgInst.bgX = bgInst.bgX-0.6;
          bgInst.bgY = bgInst.bgY-0.4;
          avatarInst.level=1;
          
        }else if(rightPressed){
          bgInst.bgX = bgInst.bgX+0.6;
          bgInst.bgY = bgInst.bgY+0.4;
          
          avatarInst.level=0;
        }
        
    }

  }
  
  

}

/*
if(aY>0.2*aX+380 && aY<0.2*aX+465 &&aX>this.x-avatarInst.w && aX<this.x+this.w){
      // console.log("On the stairs");
      let collide = [Math.abs(0.2*aX+380-aY),Math.abs(0.2*aX+465-aY),Math.abs(this.x-avatarInst.w-aX), Math.abs(this.x+this.w-aX)];
      let n=collide.indexOf(Math.min(...collide));
      switch(n){
        case n=0:
          console.log("from top");
          bgInst.bgY = bgInst.bgY-5;
          break;
        case n=1:
          console.log("from bottom"); 
          bgInst.bgY = bgInst.bgY+5;
          break;
        case n=2:
          console.log("from left");
          // bgInst.bgX = bgInst.bgX-5;
          break;
        case n=3:
          console.log("from right"); 
          // bgInst.bgX = bgInst.bgX+5;
        
          break;
        default:
          console.log("nothing...");
          break;
      } //end switch
    }else{//console.log("outside");
    }
*/


class Gate extends GameObjectInteractableLocked{
  constructor(ctx,x,y,w,h,gateKeyReq){
    super(ctx,x,y,w,h);
     this.locked = true;
    this.gateKeyReq = gateKeyReq;
    this.keyTaken = false;
  }
  
  unlock(bgInst,avatarInst,inventory){
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    var unlockAction = pickup;
    // var keyFound = inventory.some(item => item.color === this.gateKeyReq);
    var keyFoundIndex = inventory.findIndex(item => item.color === this.gateKeyReq);
      //  console.log(keyFound, JSON.stringify(inventory[0]) == JSON.stringify({"color":this.gateKeyReq}));
      // console.log("key", keyFoundIndex);
    if(((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      if(unlockAction && keyFoundIndex!=-1){
        this.locked = false;
        // this.y = Math.max(this.y-2,10);
      
      }
      
      // this.col = "#71ffff";
    }else{
      // this.col = "#ffffff";
     
    }
    if(!this.locked){
      this.y = Math.max(this.y-2,10);
    }
    if(!this.locked&&this.keyTaken==false){//drops key when opened
      var i=0;
      var j=0;
      inventory.push("temp");//prevent outofbounds kind of
      for(i; i<inventory.length-1; i++){
        
        if(i!=keyFoundIndex){
          
          inventory[i] = inventory[j];
          
        }else{
          //i==found
          j++;
          inventory[i] = inventory[j];
        }
        j++;
        // console.log(i,j, inventory[i], inventory[j]);
      }
      inventory.pop();
      inventory.pop();
      // console.log("INV LEN",inventory.length);
      this.keyTaken=true;
      // console.log("Removed",this.keyTaken);
    }
  }
  

}



class Platform extends GameObjectLocked{
  constructor(ctx,x,y,w,h){
    super(ctx,x,y,w,h,"lightblue");
    this.ctx = ctx;//fix extends
  }
  

  collisionObj(bgInst, avatarInst,stairInst){
    //custom collision detection
    let rightBorder=this.x+this.w;
    let leftBorder=this.x;
    let topBorder=this.y;
    let botBorder=this.y+this.h;
    if((avatarInst.level==0)){
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
    }else{//on level
      var canvasW = 480;
      var canvasH = 360;
      var stairH = 50;//drawn height not square h
      if (rightPressed) {
        console.log("PLAT bgY",bgInst.bgY,"avatar",convertBGYtoAvatar(bgInst.bgY),"stairs",stairInst.y );
        if(convertBGYtoAvatar(bgInst.bgY)>stairInst.y && convertBGYtoAvatar(bgInst.bgY)<stairInst.y+stairH ){
          //is in range of stairs
          if(convertBGXtoAvatar(bgInst.bgX)>stairInst.x-10){
            avatarInst.level=0;
          }
        }else{
          bgInst.bgX = Math.min(bgInst.bgX + avatarInst.speed, this.x+this.w-canvasW/2 - avatarInst.w);
        }
        

      } else if (leftPressed) {
        bgInst.bgX = Math.max(bgInst.bgX - avatarInst.speed, this.x-(0.5*canvasW));
      } else if(upPressed){
        bgInst.bgY = Math.max(bgInst.bgY - avatarInst.speed, this.y-(0.5*canvasH));
      } else if(downPressed){
        bgInst.bgY = Math.min(bgInst.bgY + avatarInst.speed, this.y+this.h -(canvasH/2) - avatarInst.h);
      }
    }
    
   
  }//end colision
}


function setShadow(ctx){
    ctx.shadowColor = "grey";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 10;
}

