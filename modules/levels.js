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
      ctx.beginPath(); // Start a new path
      //ctx.moveTo(200-bgX, 100-bgY); // Move the pen to (30, 50)
      //ctx.lineTo(200-bgX, 300-bgY); // Draw a line to (150, 100)
      ctx.moveTo(100-bgX, 100-bgY); // Move the pen to (30, 50)
      ctx.lineTo(100-bgX, 300-bgY);
      ctx.stroke(); // Render the path
      w1.collisionObj(bgX,bgY);
      w2.collisionObj(bgX,bgY);
      item1.collisionObj(bgX,bgY);
      item1.pickup();
      moveableBG.moveBG(canvas);
      openMenu(canvas,ctx);
      requestAnimationFrame(draw);
  }//===================================
  //execute
  requestAnimationFrame(draw);//framerate 
}