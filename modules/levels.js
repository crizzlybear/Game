// function level1(canvas,ctx){
//     var w1 = new GameObject(ctx,20,20,100,200);
//     var item = new GameObjectInteractable(ctx,100,100,20,20);
//     var myAvatar = new Avatar(avatarWidth,avatarHeight);
 
//     var bg1 = new BG("images/floor.png");
//     avatarX = canvas.width/2;//init
//     avatarY = 40;
 
//     //DRAW LOOP===========================
//     function draw(){
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       bg1.drawBG(canvas,ctx);
//       myAvatar.drawAvatar(ctx,avatarX,avatarY);
//       myAvatar.switchSprite(ctx,avatarX,avatarY);
//       w1.createObj();
//       w1.drawImg();
//       item.createInteractable();
//       myAvatar.moveBoundaries(canvas);
      
//       openMenu(canvas,ctx);
//       requestAnimationFrame(draw);
//     }//===================================
//     //execute
//     requestAnimationFrame(draw);
// }

function level1(canvas,ctx){
  var w1 = new GameObjectLocked(ctx,100,100,100,200);
  var w2 = new GameObjectLocked(ctx,400,300,300,100);
  let fixedAvatar = new AvatarFixed(canvas.width/2,canvas.height/2,avatarWidth,avatarHeight);
  let moveableBG = new BGLocked("images/floor.png");
  var item1 = new GameObjectInteractableLocked(ctx,300,50,20,20);
  let img0 = new Image();
    img0.crossOrigin = "anonymous";
// img.src = `images/${imgName}`;
    img0.src = "images/bed.png";
    console.log("img:",img0.src);
    
  //DRAW LOOP===========================
  function draw(){
      //menu();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //ctx.drawImage(background,0,0,1024,631,-bgX,-bgY,1024,631);//add this to BG class as well//DONT REMOVE YET

      //moveableBG.drawUpdate(ctx);
      moveableBG.drawPattern(ctx,tileObj);
      fixedAvatar.switchSprite(ctx,avatarX,avatarY);
      w1.drawObj_BGFixed(bgX,bgY);//make this before moveBG so theres no lag
      w2.drawObj_BGFixed(bgX,bgY);//make this before moveBG so theres no lag
      
      
      item1.drawObj_BGFixed(bgX,bgY);
      w1.drawObjImgLayer(ctx,img0, bgX,bgY,0,0,0,40);
      w1.collisionObj(bgX,bgY);
      w2.collisionObj(bgX,bgY);
      item1.collisionObj(bgX,bgY);
      //item1.pickup();
      item1.getEnergy();
      moveableBG.moveBG(canvas);
     
     // fixedAvatar.usePower(ctx,avatarX,avatarY);
     fixedAvatar.usePowerColorStream(ctx,avatarX,avatarY,energy);
      openMenu(canvas,ctx);
      requestAnimationFrame(draw);
      
  }//===================================
  //execute
  requestAnimationFrame(draw);//framerate 
}



function level2(canvas,ctx){
 
  var emptySpace2 = new GameObjectLocked(ctx,450,531,600,100, "#F0F0F0");
  var w1 = new GameObjectLocked(ctx,100,100,100,200);//48,100
  var w2 = new GameObjectLocked(ctx,400,300,200,10);
  var w3 = new GameObjectLocked(ctx,400,310,10,50);
  var w4 = new GameObjectLocked(ctx,600,50,200,100);
  let fixedAvatar = new AvatarFixed(canvas.width/2,canvas.height/2,avatarWidth,avatarHeight);
  let moveableBG = new BGLocked("images/floor.png");
  var item1 = new GameObjectInteractableLocked(ctx,300,50,20,20);
  var box = new GameObjectInteractableLocked(ctx,200,600,30,30);
  var enemy = new Enemy(ctx,0,0,30,30);
    let img0 = new Image();
    img0.crossOrigin = "anonymous";
    img0.src = "images/buildingLong.png";
    wallImg = new Image();
    wallImg.crossOrigin = "anonymous";
    wallImg.src = "images/wall.png";
    let boxImg = new Image();
    boxImg.crossOrigin = "anonymous";
    boxImg.src = "images/box.png";

    let whImg = new Image();
    whImg.crossOrigin = "anonymous";
    whImg.src = "images/warehouse.png";
  //DRAW LOOP===========================
  function draw(){
      //menu();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //ctx.drawImage(background,0,0,1024,631,-bgX,-bgY,1024,631);//add this to BG class as well//DONT REMOVE YET
      ctx.imageSmoothingEnabled = false;
      //moveableBG.drawUpdate(ctx);
     // moveableBG.drawPattern(ctx,tileObj);
      moveableBG.drawGradient(ctx);
      setShadow(ctx);
      emptySpace2.drawObj_BGFixed(bgX,bgY);
      fixedAvatar.switchSprite(ctx,avatarX,avatarY);
      

      //draw object collision zone
      w1.drawObj_BGFixed(bgX,bgY);//make this before moveBG so theres no lag
      w2.drawObj_BGFixed(bgX,bgY);//make this before moveBG so theres no lag
      w3.drawObj_BGFixed(bgX,bgY);
      item1.drawObj_BGFixed(bgX,bgY);
      box.drawObj_BGFixed(bgX,bgY);
      //enemy.drawObj_BGFixed(bgX,bgY);
      enemy.drawVerticalMovement(bgX,bgY,100);
      w4.drawObj_BGFixed(bgX,bgY);
      //draw layers
      w1.drawObjImgLayer(ctx,img0, bgX,bgY,0,40,0,50);
      w2.drawObjImgLayer(ctx,wallImg,bgX,bgY,0,25,0,25);
      w3.drawObjImgLayer(ctx,wallImg,bgX,bgY,0,0,0,0);
      box.drawObjImgLayer(ctx,boxImg,bgX,bgY,0,0,0,0);
      w4.drawObjImgLayer(ctx,whImg,bgX,bgY,0,40,0,40);
      //enemy.drawObjImgLayer(ctx,boxImg,bgX,bgY,0,0,0,0);
      //collisions
      w1.collisionObj(bgX,bgY);
      w2.collisionObj(bgX,bgY);
      w3.collisionObj(bgX,bgY);
      item1.collisionObj(bgX,bgY);
      emptySpace2.collisionObj(bgX,bgY);
      box.collisionObj(bgX,bgY);
      //changeBgY();
  
      w4.collisionObj(bgX,bgY);
      enemy.collisionObj2(bgX,bgY);
      //item1.pickup();
      item1.getEnergy();
      box.pickup();
      moveableBG.moveBG(canvas);
     

      
     // fixedAvatar.usePower(ctx,avatarX,avatarY);
     fixedAvatar.usePowerColorStream(ctx,avatarX,avatarY,energy);
      openMenu(canvas,ctx);
      requestAnimationFrame(draw);
      
  }//===================================
  //execute
  requestAnimationFrame(draw);//framerate 
}