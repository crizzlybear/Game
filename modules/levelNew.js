    //Preload images =======================================
    //bg
    
    // let tileObj = new Image();
    //   tileObj.src = "images/bricks2.png";
    //sprite
    
    let av = new Image();
      av.src = "images/dogAvatar15.png";
    let boxImg = new Image();
      boxImg.crossOrigin = "anonymous";
      boxImg.src = "images/box.png";
     let en = new Image();
     en.src = "images/enemy1.png";
    let itemImg = new Image();
    itemImg.crossOrigin = "anonymous";
    itemImg.src = "images/items6.png";
    let slashImg = new Image();
    slashImg.src = "images/slash.png";
    let machineFront = new Image();
    machineFront.src = "images/machineFront2.png";
    let machineBack = new Image();
    machineBack.src = "images/machineBack.png";
    let gateImg = new Image();
    gateImg.src = "images/gate.png";
    let edgeImg = new Image();
    edgeImg.src = "images/edge.png";
    let edgeImg2 = new Image();
    edgeImg2.src = "images/edge2.png";
    let edgeImg3 = new Image();
    edgeImg3.src = "images/edge3.png";


    var correctSound = new Audio();
    correctSound.src = "sounds/Gold1.wav";
    var enemySound = new Audio();
    enemySound.src = "sounds/Strange.wav";
    var pickupSound = new Audio();
    pickupSound.src = "sounds/Voice2.wav";
    var itemSound = new Audio();
    itemSound.src = "sounds/Coin.wav";
    var hitSound = new Audio();
    hitSound.src = "sounds/Hit.wav";
    hitSound.volume = 0.2;

function level1(canvas,ctx,canvasUI,ctxUI){
 
  
  var w1 = new GameObjectLocked(ctx,0,200,300,70,"rgb(191, 184, 188)");//48,100
  // var w2 = new GameObjectLocked(ctx,300,-50,100,50,"black");
  var w3 = new GameObjectLocked(ctx,230,270,70,100,"rgb(191, 184, 188)");
  var w4 = new GameObjectLocked(ctx,400,500,200,70,"rgb(191, 184, 188)");
  var w5 = new GameObjectLocked(ctx,400,400,70,100,"rgb(191, 184, 188)");

  var machine1 = new GameObjectLocked(ctx,228,320,74,50,"rgb(38, 37, 56)");
  var machine2 = new GameObjectLocked(ctx,398,400,74,50,"rgb(38, 37, 56)");

  var topWall = new GameObjectLocked(ctx,0,-100,600,100,"rgb(106, 100, 117)");
  let fixedAvatar = new Avatar(canvas.width/2,canvas.height/2-20,50,50);
  let moveableBG = new BGLocked(600,631);
  var item1 = new GameObjectInteractableLocked(ctx,350,50,30,25);
  var box = new GameObjectInteractableLocked(ctx,0,200,30,30,[255,0,0],"red");
  var b2 = new GameObjectInteractableLocked(ctx,-125,200,30,30,[0,255,0],"green");
  var b3 = new GameObjectInteractableLocked(ctx,600,500,30,30,[0,0,255],"blue");
  var b4 = new GameObjectInteractableLocked(ctx,-250,200,30,30,[0,0,0],"black");
  var b5 = new GameObjectInteractableLocked(ctx,725,500,30,30,[0,0,0],"black");
  var enemy = new Enemy(ctx,0,0,50,50);
  // var enemy2 = new Enemy(ctx,600,450,50,50);
  let rate=0;
  let rate2=0;
  var gameUI = new GameStats(20,300,50,10,120);

  var inventory = new Array();

  var gate1 = new Gate(ctxUI,380,0,50,5,"red");
  var gate2 = new Gate(ctxUI,220,0,50,5,"green");
  var gate3 = new Gate(ctxUI,300,0,50,5,"blue");

  var boxList = [box,b2,b3,b4,b5];
  let obsList = [w1,w3,w4,gate1,];
  var allObj = [w1,w3,w4,gate1,box,b2,b3,b4];
  var gateList = [gate1,gate2,gate3];
  //DRAW LOOP===========================
  function draw(){
      //menu();
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      setShadow(ctx);
      ctxUI.clearRect(0, 0, canvasUI.width, canvasUI.height);//Should check if there is a change in UI before calling
      ctxUI.imageSmoothingEnabled = false;
      /*1.BACKGROUND*/
      moveableBG.drawGradient(ctx);
 
        topWall.drawObj_BGFixed(moveableBG);
        topWall.drawWallDecor(ctxUI,moveableBG,gateList,gateImg);
      /*2.AVATAR*/
      fixedAvatar.run();
      fixedAvatar.switchSprite(ctx, rate,64,64);
      fixedAvatar.drawAttack(ctx,rate,slashImg);
      // fixedAvatar.loadNear(allObj,moveableBG,rate);
      
      /*3.DRAW OBJECT BASE - layer above avatar and moveBG so there is no lag*/
     
      w5.drawObj_BGFixed(moveableBG);
      w1.drawObj_BGFixed(moveableBG);//make this before moveBG so theres no lag
      // w2.drawObj_BGFixed(moveableBG);//make this before moveBG so theres no lag
      w3.drawObj_BGFixed(moveableBG);
      w4.drawObj_BGFixed(moveableBG);
    
      // machine1.drawObj_BGFixed(moveableBG);

      w1.drawObjImgLayer(ctx,edgeImg,moveableBG,0,0,0,-20);
      w4.drawObjImgLayer(ctx,edgeImg,moveableBG,0,0,0,-18);
      w3.drawObjImgLayer(ctx,edgeImg2,moveableBG,0,69,0,40);
      w5.drawObjImgLayer(ctx,edgeImg3,moveableBG,0,1,0,53);

      machine2.drawObj_BGFixed(moveableBG);
      // item1.drawObj_BGFixed(moveableBG);
      if(rate==0){
        boxSpeed = Math.min(boxSpeed+0.01,5);
      }
      item1.drawItemImg(ctx,itemImg,moveableBG,60,50);
      box.animateLPath(rate,0,200,300,300);
      b2.animateLPath(rate,0,200,300,300);
      b4.animateLPath(rate,0,200,300,300);
      b3.animateLPathReverse(rate,600,500,(600-200+30),(500-100));
      b5.animateLPathReverse(rate,600,500,(600-200+30),(500-100));

      gate1.drawObj_BGFixed(moveableBG);
      gate2.drawObj_BGFixed(moveableBG);
      gate3.drawObj_BGFixed(moveableBG);

      /*4.DRAW OBJECT IMAGE LAYER*/
      
      
      
      if(!box.pickedUp &&box.visible&&box.x>0-box.w){box.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      if(!b2.pickedUp&&b2.visible&&b2.x>0-box.w){b2.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      if(!b3.pickedUp&&b3.visible&&b3.x<moveableBG.bgW){b3.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      if(!b4.pickedUp&&b4.visible&&b4.x>0-box.w){b4.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      if(!b5.pickedUp&&b5.visible&&b5.x<moveableBG.bgW){b5.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      
      machine1.drawObjImgLayer(ctx,machineBack,moveableBG,0,0,0,0);
      machine2.drawObjImgLayer(ctx,machineFront,moveableBG,0,0,0,0);


      /*Enemies*/
      if(enemy.health>=0 && enemy.pickedUp){
        enemy.enemyHealthBar(ctx,moveableBG);
        enemy.drawFollow(moveableBG,rate,rate2,fixedAvatar, hitSound);
      }
      /*COLOR BOX DEBUGGING
      if(!box.pickedUp &&box.visible){box.drawObj_BGFixed(moveableBG)}
      if(!b2.pickedUp&&b2.visible){b2.drawObj_BGFixed(moveableBG)}
      if(!b3.pickedUp&&b3.visible){b3.drawObj_BGFixed(moveableBG)}
      if(!b4.pickedUp&&b4.visible){b4.drawObj_BGFixed(moveableBG)}
      if(!b5.pickedUp&&b5.visible){b5.drawObj_BGFixed(moveableBG)}
      */
      
      /*5.AVATAR COLLISIONS*/
      if(rightPressed||leftPressed||upPressed||downPressed){
        w1.collisionObj(moveableBG,fixedAvatar);
        // w2.collisionObj(moveableBG,fixedAvatar);
        w3.collisionObj(moveableBG,fixedAvatar);
        w4.collisionObj(moveableBG,fixedAvatar);
        w5.collisionObj(moveableBG,fixedAvatar);
        item1.collisionObj(moveableBG,fixedAvatar);
       
        box.collisionObj(moveableBG,fixedAvatar);
        // stair1.collisionObj(moveableBG,fixedAvatar);
        gate1.collisionObj(moveableBG,fixedAvatar);
        gate2.collisionObj(moveableBG,fixedAvatar);
        gate3.collisionObj(moveableBG,fixedAvatar);
      }
     
  
      /*ENEMY COLLISIONS and ATTACK*/
      // if(enemy.health>=0 && !enemy.isIdle){enemy.collisionObstacles(obsList);}
      // if(enemy2.health>=0  && !enemy2.isIdle){enemy2.collisionObstacles(obsList);}
      if(enemy.health>=0){enemy.isAttacked(moveableBG,fixedAvatar, hitSound);}
      // if(enemy2.health>=0){enemy2.isAttacked(moveableBG,fixedAvatar);}
      

      /*ITEM and INTERACTABLE PROPERTIES*/
      item1.getEnergy(moveableBG, fixedAvatar, itemSound);
      if(!box.pickedUp&&box.visible){box.pickupItem(moveableBG, fixedAvatar,inventory,enemy, enemySound, pickupSound)};
      if(!b2.pickedUp&&b2.visible){b2.pickupItem(moveableBG, fixedAvatar,inventory,enemy, enemySound, pickupSound)};
      if(!b3.pickedUp&&b3.visible){b3.pickupItem(moveableBG, fixedAvatar,inventory,enemy, enemySound, pickupSound)};
      if(!b4.pickedUp&&b4.visible){b4.pickupItem(moveableBG, fixedAvatar,inventory,enemy, enemySound, pickupSound)};
      if(!b5.pickedUp&&b5.visible){b5.pickupItem(moveableBG, fixedAvatar,inventory,enemy, enemySound, pickupSound)};
      
     
      // if(!b4.pickedUp){b4.pickupItem(moveableBG, fixedAvatar,inventory,{"color":"black"})};
      gate1.unlock(moveableBG,fixedAvatar,inventory,correctSound);
      gate2.unlock(moveableBG,fixedAvatar,inventory,correctSound);
      gate3.unlock(moveableBG,fixedAvatar,inventory,correctSound);
      /*UI*/
      gameUI.drawEnergyBar(ctxUI,fixedAvatar);
      gameUI.drawHealthBar(ctxUI,fixedAvatar);
      gameUI.drawCount(ctxUI,gateList);
      gameUI.drawObjective(ctxUI,gateList);
      // inventoryBox.drawInventory(ctx,inventory);//TOGGLE FOR COLOR DEBUG
      fixedAvatar.drawCarriedBox(ctx,inventory,boxImg);
      
      /*Move BG LAST to prevent lag */
      moveableBG.moveBG(canvas, fixedAvatar);
     

      /*AVATAR EFFECTS*/
      fixedAvatar.getClosestItemColors(boxList,moveableBG,rate);
      fixedAvatar.usePowerColorParticle(ctxUI, moveableBG);

      /*ANIMATION FRAME RATE*/
      rate = (rate+1)%10;//let this be frame rate, e.g if rate == 3, only every 1 out of every 100 frames will be called.
      rate2 = (rate2+1)%200;
      // openMenu(canvas,ctx);

      if(fixedAvatar.health<=0 || timeOut){
        drawText(ctxUI, 110,150,48,"black","GAME OVER");
        enemy.health=-1;
        gameOver=true;
        ctx.filter = 'grayscale(1)';
        if(shiftPressed){
          fixedAvatar.health=1000;
          fixedAvatar.energy=1000;
          gameUI.resetScore(gateList);
          moveableBG.bgX=0;
          moveableBG.bgY=0;
          boxSpeed=2;
          inventory.pop();
          timeOut=false;
          gameUI.countDownTimer();//new timer;
          ctx.filter = 'grayscale(0)';
          gameOver=false; 
        }
      }
      requestAnimationFrame(draw);
     
  }//===================================

 

  /*EXECUTE */
    gameUI.countDownTimer();//Timer must be placed outside of game loop!
    requestAnimationFrame(draw);
    

  
}