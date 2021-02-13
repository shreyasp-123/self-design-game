class Enemy4{
  constructor(x, y, width, height, image){
    this.sprite = createSprite(x, y, width, height)
    this.sprite.addImage(image)
    this.sprite.scale = 0.4
    this.sprite.lifetime = windowHeight + 20
    this.sprite.velocityY = 3 + score/100
    //this.sprite.debug = true
    enemyGroup4.add(this.sprite)


  }
    
}

function createEnemy4(x, y, width, height, image){
  enemy4 = new Enemy4(x, y, width, height, image)
  return enemy4
}