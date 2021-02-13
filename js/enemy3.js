class Enemy3{
  constructor(x, y, width, height, image){
    this.sprite = createSprite(x, y, width, height)
    this.sprite.addImage(image)
    this.sprite.lifetime = windowHeight + 20
    this.sprite.scale = 0.1
    //this.sprite.debug = true
    this.sprite.setCollider("circle", 0, 0)
    this.sprite.velocityY = 3 + score/100
    enemyGroup3.add(this.sprite)


  }
    
}

function createEnemy3(x, y, width, height, image){
  enemy3 = new Enemy3(x, y, width, height, image)
  return enemy3
}