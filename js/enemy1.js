class Enemy1{
  constructor(x, y, width, height, image){
    this.sprite = createSprite(x, y, width, height)
    this.sprite.addImage(image)
    this.sprite.scale = 0.08
    this.sprite.lifetime = windowHeight + 20
    this.sprite.velocityY = 3 + score/100
    //this.sprite.debug = true
    enemyGroup1.add(this.sprite)


  }
    
}

function createEnemy1(x, y, width, height, image){
  enemy1 = new Enemy1(x, y, width, height, image)
  return enemy1
}