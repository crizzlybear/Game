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

  drawAvatar(ctx,updateX,updateY) {
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
        // drawSprite(0);
        // last =0;
        if(Math.abs(bgX)%20<10){
          drawSprite(0);
          last=0;
        }else{
          drawSprite(4);
          last =4;
        }
    }else if(leftPressed){
        // drawSprite(1);
        // last =1;
       // console.log("bgX:", bgX%20);
        if(Math.abs(bgX)%20<10){
          drawSprite(1);
          last=1;
        }else{
          drawSprite(5);
          last =5;
        }
    }else if(upPressed){
        // drawSprite(2);
        // last =2;
        if(Math.abs(bgY)%20<10){
          drawSprite(6);
          last=6;
        }else{
          drawSprite(7);
          last =7;
        }
        
    }else if(downPressed){
        // drawSprite(3);
        // last =3;
        if(Math.abs(bgY)%20<10){
          drawSprite(3);
          last=3;
        }else{
          drawSprite(2);
          last =2;
        }
    }else{
        drawSprite(2);
        //drawSprite(last);
    }
  }


}//end Avatar

class AvatarFixed extends Avatar{
  constructor(){
    super();
  }
  
  averageColor(){
    
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "images/colormap.png";
    let canvas2 = document.getElementById("myCanvas2");
    let context= canvas2.getContext &&canvas2.getContext('2d');
    let imgData = 0;
    if(img==null){
        console.log("img is null");
        return null;
    }
    img.addEventListener("load",(e)=>{
       
        
        //context.drawImage(img, 0, 0,img.width,img.height,-400/10,-160/10,img.width/10,img.height/10);
        context.clearRect(0,0,img.width, img.height);
        context.drawImage(img, 0, 0,img.width,img.height,-bgX/10,-bgY/10,img.width/10,img.height/10);
        imgData = context.getImageData( 0, 0, 50, 50);
        //console.log("len", imgData.data.length/40);
        var len = imgData.data.length;
        for (var i = 0; i < len; i += 40) {
        rgb.r += imgData.data[i];
        rgb.g += imgData.data[i + 1];
        rgb.b += imgData.data[i + 2];
        //console.log("rbg..",rgb.r,rgb.g,rgb.b);
        }
        rgb.r= Math.floor(rgb.r / (len/40));
        rgb.g = Math.floor(rgb.g / (len/40));
        rgb.b= Math.floor(rgb.b / (len/40));

        // console.log("RGBf: ",rgb);
        //context.clearRect(0, 0, canvas2.width, canvas2.height);
        
    });
    console.log("RGBa: ",rgb);
    return JSON.parse(JSON.stringify(rgb));
   

}



  usePower(ctx, updateX,updateY){
    //maybe create another ctx to act as a mask
    if(powerOn){
      console.log("power On!");
      
      ctx.beginPath();
      // ctx.globalCompositeOperation = 'xor';//cool effect but not needed
      ctx.rect(updateX,updateY, avatarWidth+30, avatarHeight+30);
      //ctx.fillStyle="rgba(255,0,255,0.5)";//single object transparency
      // var col = this.averageColor();
      // console.log("returned col: "+col);
      // ctx.fillStyle = col;
      var col = this.averageColor();
      var str = `rgba(${col.r},${col.g},${col.b},0.6)`;
      console.log("str:", str);
      ctx.fillStyle = str;
      ctx.fill();
      ctx.closePath();

    }
    
  }


  usePowerColorStream(ctx){
    //maybe create another ctx to act as a mask
    if(powerOn&&energy>0){
      energy=energy-1;
      // console.log("Energy:",energy);
      document.getElementById("energy").innerText=energy;
      console.log("power On Color Stream!");
      let img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "images/colormap.png";
      
      
      // ctx.save();
      // ctx.filter = "blur(20px)";
      // ctx.beginPath();
      // ctx.arc(avatarX+30, avatarY+30, 10, 0, Math.PI * 2); // Hole anticlockwise
      // ctx.fill();
      // ctx.closePath();
      // ctx.restore();
      // ctx.save();
      // ctx.clip();
     
      ctx.save();//remove if above is uncommented
      ctx.beginPath();  
      ctx.filter = "blur(15px)";
      ctx.drawImage(img,avatarX+bgX,avatarY+bgY,60,60,avatarX,avatarY,60,60)
      ctx.fill();
      ctx.closePath();
      
      
      ctx.restore(); 
    }
    
  }


}
