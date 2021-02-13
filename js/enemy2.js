class Enemy2{
  constructor(x, y, width, height, image){
    this.sprite = createSprite(x, y, width, height)
    this.sprite.addImage(image)
    this.sprite.lifetime = windowHeight + 20
    this.sprite.scale = 0.2
    //this.sprite.debug = true
    this.sprite.setCollider("rectangle", 0, 0, this.sprite.width - 200, this.sprite.height)
    this.sprite.velocityY = 3 + score/100
    enemyGroup2.add(this.sprite)


  }
    
}

function createEnemy2(x, y, width, height, image){
  enemy2 = new Enemy2(x, y, width, height, image)
  return enemy2
}