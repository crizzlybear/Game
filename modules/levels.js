function level1(canvas,ctx){
    var w1 = new GameObject(ctx,20,20,100,200);
    var item = new GameObjectInteractable(ctx,100,100,20,20);
    var myAvatar = new Avatar(avatarWidth,avatarHeight);
 
    var bg1 = new BG("images/floor.png");
    avatarX = canvas.width/2;//init
    avatarY = 40;
 
    //DRAW LOOP===========================
    function draw(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bg1.drawBG(canvas,ctx);
      myAvatar.drawAvatar(ctx,avatarX,avatarY);
      myAvatar.switchSprite(ctx,avatarX,avatarY);
      w1.createObj();
      w1.drawImg();
      item.createInteractable();
      myAvatar.moveBoundaries(canvas);
      
      openMenu(canvas,ctx);
      requestAnimationFrame(draw);
    }//===================================
    //execute
    requestAnimationFrame(draw);
}

