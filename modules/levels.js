    //Preload images =======================================
    //bg
    let background = new Image();
    let tileObj = new Image();
      tileObj.src = "images/bricks2.png";
    //sprite
    let av = new Image();
      av.src = "images/dogAvatar15.png";
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
     let en = new Image();
     en.src = "images/enemy1.png";
    let stairsImg = new Image();
    stairsImg.src = "images/stairs.png";
function level2(canvas,ctx){
 
  
  var w1 = new GameObjectLocked(ctx,100,100,100,200,"#F0F0F0",[255,0,0]);//48,100
  var w2 = new GameObjectLocked(ctx,400,300,200,10,"#F0F0F0",[255,0,0]);
  var w3 = new GameObjectLocked(ctx,400,310,10,50,"#F0F0F0",[255,0,0]);
  var w4 = new GameObjectLocked(ctx,600,50,200,100,"#F0F0F0",[0,0,255]);
  var emptySpace2 = new GameObjectLocked(ctx,450,531,600,100, "#F0F0F0",[0,0,255]);
  let fixedAvatar = new AvatarFixed(canvas.width/2,canvas.height/2,50,50);
  let moveableBG = new BGLocked("images/floor.png");
  var item1 = new GameObjectInteractableLocked(ctx,300,50,20,20);
  var box = new GameObjectInteractableLocked(ctx,200,600,30,30,[255,0,0]);
  var b2 = new GameObjectInteractableLocked(ctx,550,500,30,30,[0,255,0]);
  var b3 = new GameObjectInteractableLocked(ctx,800,100,30,30,[0,0,255]);
  var b4 = new GameObjectInteractableLocked(ctx,850,100,30,30,[0,0,0]);
  var enemy = new Enemy(ctx,0,0,30,30);
  var enemy2 = new Enemy(ctx,450,450,80,80);
  let rate=0;
  var stair1 = new Stairs(ctx,100,450,150,100);
  //let energy = 1000;
  var energyStat = new GameStats(20,300,50,10);
  var boxList = [box,b2,b3,b4];
  let obsList = [w1,w2,w3,w4,emptySpace2];

  //DRAW LOOP===========================
  function draw(){
      //menu();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //ctx.drawImage(background,0,0,1024,631,-bgX,-bgY,1024,631);//add this to BG class as well//DONT REMOVE YET
      ctx.imageSmoothingEnabled = false;
      //moveableBG.drawUpdate(ctx);
      //moveableBG.drawPattern(ctx,tileObj);
      
      moveableBG.drawGradient(ctx);
      moveableBG.drawGroundRandom(ctx);
      stair1.drawObj_BGFixed(moveableBG);
      stair1.drawObjImgLayer(ctx,stairsImg,moveableBG,0,0,0,0);
      setShadow(ctx);
      emptySpace2.drawObj_BGFixed(moveableBG);
     
      fixedAvatar.switchSprite(ctx, rate);
      fixedAvatar.run();
      
      // if(bgX>w1.x+w1.w || bgY>w1.y+w1.h){
      //   //check out of bounds
      //   console.log("out of bounds");
      // }

      //draw object collision zone
      
      w1.drawObj_BGFixed(moveableBG);//make this before moveBG so theres no lag
      w2.drawObj_BGFixed(moveableBG);//make this before moveBG so theres no lag
      w3.drawObj_BGFixed(moveableBG);
      

      item1.drawObj_BGFixed(moveableBG);
      
      box.drawObj_BGFixed(moveableBG);
      b2.drawObj_BGFixed(moveableBG);
      b3.drawObj_BGFixed(moveableBG);
      b4.drawObj_BGFixed(moveableBG);
      //enemy.drawObj_BGFixed(moveableBG);
      // enemy.drawVerticalMovement(moveableBG,100);
      if(enemy.health>=0){
        enemy.enemyHealthBar(ctx,moveableBG);
        enemy.drawFollow(moveableBG,rate);
      }
      if(enemy2.health>=0){
        enemy2.enemyHealthBar(ctx,moveableBG);
        enemy2.drawFollow(moveableBG,rate);
      }
      w4.drawObj_BGFixed(moveableBG);
      //draw layers
      w1.drawObjImgLayer(ctx,img0,moveableBG,0,40,0,50);
      w2.drawObjImgLayer(ctx,wallImg,moveableBG,0,25,0,25);
      w3.drawObjImgLayer(ctx,wallImg,moveableBG,0,0,0,0);
      box.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0);
      w4.drawObjImgLayer(ctx,whImg,moveableBG,0,40,0,40);
      
      // w5.animateThis(rate);

      //enemy.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0);
      //collisions
      w1.collisionObj(moveableBG,fixedAvatar);
      if(enemy.health>=0){enemy.collisionObstacles(moveableBG,w1, obsList);}
      if(enemy2.health>=0){enemy2.collisionObstacles(moveableBG,w1, obsList);}
      w2.collisionObj(moveableBG,fixedAvatar);
      w3.collisionObj(moveableBG,fixedAvatar);
      item1.collisionObj(moveableBG,fixedAvatar);
      emptySpace2.collisionObj(moveableBG,fixedAvatar);
      box.collisionObj(moveableBG,fixedAvatar);
      stair1.collisionObj(moveableBG,fixedAvatar);
      //changeBgY();
  
      w4.collisionObj(moveableBG,fixedAvatar);
      // /enemy.collisionObj2(moveableBG,fixedAvatar);
      if(enemy.health>=0){enemy.isAttacked(moveableBG,fixedAvatar);}
      if(enemy2.health>=0){enemy2.isAttacked(moveableBG,fixedAvatar);}
      //item1.pickup();
      item1.getEnergy(moveableBG, fixedAvatar);
      box.pickup(moveableBG, fixedAvatar);
      energyStat.drawEnergyBar(ctx,energy);
      energyStat.drawHealthBar(ctx,fixedAvatar);
      moveableBG.moveBG(canvas, fixedAvatar);
     

      fixedAvatar.closestObject(boxList,moveableBG,rate);
     // fixedAvatar.usePower(ctx);
    //  fixedAvatar.usePowerColorStream(ctx, moveableBG);
      fixedAvatar.usePowerColorParticle(ctx, moveableBG);
      rate = (rate+1)%10;//let this be frame rate, e.g if rate == 3, only every 1 out of every 100 frames will be called.
      
     
      
      
      openMenu(canvas,ctx);
      if(fixedAvatar.health>0){
        requestAnimationFrame(draw);
      }else{
        requestAnimationFrame(gameOver);
      }
  }//===================================


  function gameOver(){
    //menu();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(background,0,0,1024,631,-bgX,-bgY,1024,631);//add this to BG class as well//DONT REMOVE YET
    ctx.imageSmoothingEnabled = false;
    drawMenu(canvas,ctx);
    drawText(canvas,ctx, 110,150,48,"black","GAME OVER");
    drawText(canvas,ctx, 80,200,20,"black","Press any key to continue...");

    
    
  }//

  //execute
  if(fixedAvatar.health>0){
    requestAnimationFrame(draw);
  }else{
    gameOver();
  }
  //framerate 
}