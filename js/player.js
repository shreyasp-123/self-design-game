class Player{
    constructor(x, y){
     this.sprite = createSprite(x, y, 50, 50)
     this.sprite.addImage(playerImg)  
     this.sprite.scale = 0.15
     //this.sprite.debug = true
     this.sprite.setCollider("circle", 0, 0, 350)
    }
    move(moveX, moveY){
        this.sprite.x += moveX
        this.sprite.y += moveY
    }
}