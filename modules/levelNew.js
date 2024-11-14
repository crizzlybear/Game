    //Preload images =======================================
    //bg
    
    // let tileObj = new Image();
    //   tileObj.src = "images/bricks2.png";
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
    var correctSound = new Audio();
    correctSound.src = "images/Gold1.wav";
    var enemySound = new Audio();
    enemySound.src = "images/Strange.wav";
    var pickupSound = new Audio();
    pickupSound.src = "images/Voice2.wav";
function level3(canvas,ctx){
 
  
  var w1 = new GameObjectLocked(ctx,0,200,300,70,"#F0F0F0");//48,100
  // var w2 = new GameObjectLocked(ctx,300,-50,100,50,"black");
  var w3 = new GameObjectLocked(ctx,230,270,70,100,"#F0F0F0");
  var w4 = new GameObjectLocked(ctx,400,500,200,70,"#F0F0F0");
  var w5 = new GameObjectLocked(ctx,400,400,70,100,"#F0F0F0");
  let fixedAvatar = new Avatar(canvas.width/2,canvas.height/2-20,50,50);
  let moveableBG = new BGLocked(600,631);
  var item1 = new GameObjectInteractableLocked(ctx,350,50,20,20);
  var box = new GameObjectInteractableLocked(ctx,0,200,30,30,[255,0,0],"red");
  var b2 = new GameObjectInteractableLocked(ctx,-125,200,30,30,[0,255,0],"green");
  var b3 = new GameObjectInteractableLocked(ctx,600,500,30,30,[0,0,255],"blue");
  var b4 = new GameObjectInteractableLocked(ctx,-250,200,30,30,[0,0,0],"black");
  var b5 = new GameObjectInteractableLocked(ctx,725,500,30,30,[0,0,0],"black");
  var enemy = new Enemy(ctx,0,0,50,50);
  // var enemy2 = new Enemy(ctx,600,450,50,50);
  let rate=0;
  var gameUI = new GameStats(20,300,50,10);

  var inventory = new Array();
  var inventoryBox = new GameStats(300,280,15,15);

  var gate1 = new Gate(ctx,550,0,50,10,"red");
  var gate2 = new Gate(ctx,0,0,50,10,"green");
  var gate3 = new Gate(ctx,300,0,50,10,"blue");

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

      /*1.BACKGROUND*/
      moveableBG.drawGradient(ctx);
      /*Bg options:
        //moveableBG.drawUpdate(ctx);
        //moveableBG.drawPattern(ctx,tileObj);
        //moveableBG.drawGroundRandom(ctx);
        //stair1.drawObj_BGFixed(moveableBG);
      */
      
      
      /*2.AVATAR*/
      fixedAvatar.switchSprite(ctx, rate,64,64);
      fixedAvatar.run();
      fixedAvatar.drawAttack(ctx,rate);
      // fixedAvatar.loadNear(allObj,moveableBG,rate);
      
      /*3.DRAW OBJECT BASE - layer above avatar and moveBG so there is no lag*/
      w5.drawObj_BGFixed(moveableBG);
      w1.drawObj_BGFixed(moveableBG);//make this before moveBG so theres no lag
      // w2.drawObj_BGFixed(moveableBG);//make this before moveBG so theres no lag
      w3.drawObj_BGFixed(moveableBG);
      w4.drawObj_BGFixed(moveableBG);
     
      item1.drawObj_BGFixed(moveableBG);
      
      box.animateThis(rate,0,200,300,300);
      b2.animateThis(rate,0,200,300,300);
      b4.animateThis(rate,0,200,300,300);
      b3.animateThis2(rate,600,500,(600-200+30),(500-100));
      b5.animateThis2(rate,600,500,(600-200+30),(500-100));

      gate1.drawObj_BGFixed(moveableBG);
      gate2.drawObj_BGFixed(moveableBG);
      gate3.drawObj_BGFixed(moveableBG);
      /*Enemies*/
      if(enemy.health>=0 && enemy.pickedUp){
        enemy.enemyHealthBar(ctx,moveableBG);
        enemy.drawFollow(moveableBG,rate);
      }
      // if(enemy2.health>=0){
      //   enemy2.enemyHealthBar(ctx,moveableBG);
      //   enemy2.drawFollow(moveableBG,rate);
      // }
      /*Enemy options
         //enemy.drawObj_BGFixed(moveableBG);
        / enemy.drawVerticalMovement(moveableBG,100);
      */

      /*4.DRAW OBJECT IMAGE LAYER*/
      
      // w1.drawObjImgLayer(ctx,img0,moveableBG,0,40,0,50);
      // w2.drawObjImgLayer(ctx,wallImg,moveableBG,0,25,0,25);
      // w3.drawObjImgLayer(ctx,wallImg,moveableBG,0,0,0,0);
      // w4.drawObjImgLayer(ctx,whImg,moveableBG,0,40,0,40);

      if(!box.pickedUp &&box.visible){box.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      if(!b2.pickedUp&&b2.visible){b2.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      if(!b3.pickedUp&&b3.visible){b3.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      if(!b4.pickedUp&&b4.visible){b4.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      if(!b5.pickedUp&&b5.visible){b5.drawObjImgLayer(ctx,boxImg,moveableBG,0,0,0,0)}
      
      
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
      if(enemy.health>=0){enemy.isAttacked(moveableBG,fixedAvatar);}
      // if(enemy2.health>=0){enemy2.isAttacked(moveableBG,fixedAvatar);}
      

      /*ITEM and INTERACTABLE PROPERTIES*/
      item1.getEnergy(moveableBG, fixedAvatar);
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
      gameUI.drawEnergyBar(ctx,fixedAvatar);
      gameUI.drawHealthBar(ctx,fixedAvatar);
      gameUI.drawCount(ctx,gateList);
      gameUI.drawObjective(ctx,gateList);
      // inventoryBox.drawInventory(ctx,inventory);//TOGGLE FOR COLOR DEBUG
      fixedAvatar.drawCarriedBox(ctx,inventory,boxImg);
      
      /*Move BG LAST to prevent lag */
      moveableBG.moveBG(canvas, fixedAvatar);
     

      /*AVATAR EFFECTS*/
      fixedAvatar.getClosestItemColors(boxList,moveableBG,rate);
      fixedAvatar.usePowerColorParticle(ctx, moveableBG);

      /*ANIMATION FRAME RATE*/
      rate = (rate+1)%10;//let this be frame rate, e.g if rate == 3, only every 1 out of every 100 frames will be called.
      
      // openMenu(canvas,ctx);
      if(fixedAvatar.health<0){
        drawText(ctx, 110,150,48,"black","GAME OVER");
        ctx.filter = 'grayscale(1)';
        if(shiftPressed){
          fixedAvatar.health=1000; 
          ctx.filter = 'grayscale(0)'; 
        }
      }
      requestAnimationFrame(draw);
     
  }//===================================

 

  /*EXECUTE */
    requestAnimationFrame(draw);

  
}