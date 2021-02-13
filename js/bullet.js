class Bullet{
    constructor(x, y){
        this.sprite = createSprite(x, y, 10, 30)
        this.sprite.addImage(bulletImg)
        this.sprite.scale = 0.1
        this.sprite.depth = player.sprite.depth - 1
        //this.sprite.debug = true
        this.sprite.setCollider("circle", 0, 0, 100)
        this.sprite.velocityY = -2 - score/100
        bulletGroup.add(this.sprite)
    }
}
function spawnBullets(){
    if(keyCode === 32){
        new Bullet(player.sprite.x, player.sprite.y)
        shootSound.play()
    }
}