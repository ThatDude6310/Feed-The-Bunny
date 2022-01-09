const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground , rope , rope2 , rope3

var fruit , fruitCon , fruitCon2 , fruitCon3

var backgroundImg , fruitImg , bunnyImg , button

var bunny

var bunnyBlink , bunnyEat , bunnySad

var bgSound , cutSound , eatingSound , sadSound , airSound

var airBlower , muteButton

var button2 , button3

var canvH , canvW

function preload(){
  backgroundImg = loadImage("background.png")
  fruitImg = loadImage("melon.png")
  bunnyImg = loadImage("Rabbit-01.png")

  bunnyBlink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  bunnyEat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  bunnySad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")

  bunnyBlink.playing=true
  bunnyEat.playing=true
  bunnyEat.looping=false
  bunnySad.playing=true
  bunnySad.looping=false

  bgSound = loadSound("sound1.mp3")
  cutSound = loadSound("rope_cut.mp3")
  eatingSound= loadSound("eating_sound.mp3")
  sadSound = loadSound("sad.wav")
  airSound = loadSound("air.wav")
  

}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); if(isMobile){ canvW = displayWidth; canvH = displayHeight; createCanvas(displayWidth+80, displayHeight); } else { canvW = windowWidth; canvH = windowHeight; createCanvas(windowWidth, windowHeight); }

  console.log(windowWidth,windowHeight)
  engine = Engine.create();
  world = engine.world;
  bgSound.play()
  bgSound.setVolume(0.5)

  button= createImg("cut_button.png")
  button.position(20,30)
  button.size(50,50)
  button.mouseClicked(drop)  

  button2 = createImg("cut_button.png")
  button2.position(330,35)
  button2.size(60,60)
  button2.mouseClicked(drop2)

  button3 = createImg("cut_button.png")
  button3.position(360,200)
  button3.size(60,60)
  button3.mouseClicked(drop3)


  airBlower = createImg("balloon.png")
  airBlower.position(10,210)
  airBlower.size(150,100)
  airBlower.mouseClicked(airBlow)

  muteButton = createImg("mute.png")
  muteButton.position(450,15)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)



  bunnyBlink.frameDelay=20
  bunnyEat.frameDelay=20
  bunnySad.frameDelay=20
  bunny = createSprite(170,canvH-80,100,100);
  bunny.addAnimation("blinking",bunnyBlink)
  bunny.addAnimation("eating",bunnyEat)
  bunny.addAnimation("sad",bunnySad)
  bunny.changeAnimation("blinking")
  bunny.scale = 0.2

 
  imageMode(CENTER)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ground = new Ground(200,canvH,600,20);
  rope = new Rope(8,{x:40,y:30})
  rope2 = new Rope(7,{x:370,y:40})
  rope3 = new Rope(4,{x:400,y:225})

  fruit = Bodies.circle(300,300,15,{density:0.001})
  Matter.Composite.add(rope.body,fruit)
  fruitCon = new Link(rope , fruit)
  fruitCon2 = new Link(rope2 , fruit)
  fruitCon3 = new Link(rope3 , fruit)
}

function draw() 
{
  background(51);
  image(backgroundImg,0,0,displayWidth+80,displayHeight);
  Engine.update(engine);

  ground.display()
  rope.show()
  rope2.show()
  rope3.show()

  if (fruit != null ) {
    image(fruitImg,fruit.position.x,fruit.position.y,60,60)
  }

  if (collide(fruit,bunny)==true) {
    bunny.changeAnimation("eating")
    eatingSound.play()
  }
  if (collide(fruit,ground.body)==true) {
    bunny.changeAnimation("sad")
    sadSound.play()
  }

  drawSprites();
  

  //var pos = fruit.position
  //ellipse(pos.x,pos.y,15,15)
  
   
}


function drop(){
  rope.break()
  fruitCon.detach()
  fruitCon = null
  cutSound.play()
}

function drop2(){
  rope2.break()
  fruitCon2.detach()
  fruitCon2 = null
  cutSound.play()
}

function drop3(){
  rope3.break()
  fruitCon3.detach()
  fruitCon3 = null
  cutSound.play()
}

function collide(body,sprite){
  if (body != null) {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d <= 80) {
      World.remove(world,fruit)
      fruit=null
      return true
    }
    else{
      return false
    }
  }
}

function airBlow (){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  airSound.play()
}

function mute (){
  if (bgSound.isPlaying()) {
    bgSound.stop()
  } else {
    bgSound.play()
  }
}



