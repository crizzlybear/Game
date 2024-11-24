class Gate extends GameObjectLocked{
    constructor(ctx,x,y,w,h,gateKeyReq){
        super(ctx,x,y,w,h,gateKeyReq);
        this.locked = true;
        this.gateKeyReq = gateKeyReq;
        this.keyTaken = false;
        this.score = 0;
    }

    unlock(bgInst,avatarInst,inventory,unlockSound){
        let rightBorder=this.x+this.w + 10;
        let leftBorder=this.x -10;
        let topBorder=this.y - 10;
        let botBorder=this.y+this.h + 10;

        if(((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){

            if(!this.locked){
            this.y = Math.max(this.y-2,10);
            }

            if( (inventory.length==1)&& (this.gateKeyReq == inventory[0]) && pickup ){
                inventory.pop();
                this.score++;
                unlockSound.play();
                console.log("@",this.gateKeyReq,":",this.score);
            }
        }
    }


}
  
  
  