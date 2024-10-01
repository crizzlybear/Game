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

      moveableBG.drawUpdate(ctx);
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