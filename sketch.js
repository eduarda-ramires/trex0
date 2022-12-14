  //declarar variaveis
  var END = 0;

  var trex, trex_running, trex_stoped;
  var ground, groundImage;
  var gameover, gameoverImage;
  var nuvem, nuvemImage;
  var arvore, arvoreImage1, arvoreImage2, arvoreImage3, arvoreImage4, arvoreImage5, arvoreImage6;

  var pontos = 0;

  var state = 1;
  var numeroAleatorio;
  var checkSom, morreuSom, pularSom;
  var restart, restartImage;


  var arvoreGrupo;
  var nuvensGrupo;


function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_stoped = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  nuvemImage = loadImage("cloud.png");
  arvoreImage1 = loadImage("obstacle1.png");
  arvoreImage2 = loadImage("obstacle2.png");
  arvoreImage3 = loadImage("obstacle3.png");
  arvoreImage4 = loadImage("obstacle4.png");
  arvoreImage5 = loadImage("obstacle5.png");
  arvoreImage6 = loadImage("obstacle6.png");
  gameoverImage = loadImage("gameOver.png");
  checkSom = loadSound("checkpoint.mp3");
  morreuSom = loadSound("die.mp3");
  pularSom = loadSound("jump.mp3");
  restartImage = loadImage("RESTART.png"); 

}

function setup() {
  console.log(mensagem);
  createCanvas(600, 200)
  arvoreGrupo = new Group();
  nuvensGrupo = new Group();

  //crie um sprite de trex
  trex = createSprite(50, 158);
  trex.addAnimation("correndo", trex_running);
  trex.addAnimation("trexmorreu" ,trex_stoped);
  trex.scale = 0.5;

  ground = createSprite(0, 180);
  ground.addImage("fundinho", groundImage);
  ground.velocityX = -5;
  
  gameover = createSprite(300, 100);
  gameover.addImage("fimdejogo", gameoverImage);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(300, 150);
  restart.addImage("restart", restartImage);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {

  background("white");

  if (state == 1) {
    console.log(mensagem);

    text("Pontos: " + pontos, 500, 50);
    pontos = pontos + 1;
    if(pontos%100==0){
      checkSom.play();
    }
    //pular quando a tecla espaço for pressionada
    if (keyDown("space") && trex.y > 150) {
      trex.velocityY = -10;
      pularSom.play();
    }else {
      trex.velocityY = trex.velocityY + 0.5;
    }


    if (arvoreGrupo.isTouching(trex)) {
      morreuSom.play();
      state = 0;
    }


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    trex.collide(ground);

    spawnNuvem();
    spawnArvore();

  }

  if (state == 0) {
    //game over
    trex.changeAnimation("trexmorreu", trex_stoped);
    ground.velocityX = 0;
    trex.velocityY = 0;
    arvoreGrupo.setVelocityXEach(0);
    nuvensGrupo.setVelocityXEach(0);
    gameover.visible = true;
    arvoreGrupo.setLifetimeEach(-1);
    nuvensGrupo.setLifetimeEach(-1);
  }
  drawSprites();
}

function spawnNuvem() {
  if (frameCount % 60 == 0) { //a cada tempo executar
    tempoNuvem = Math.round(random(60, 300));
    nuvem = createSprite(600, Math.round(random(0, 100)));
    nuvensGrupo.add(nuvem);
    nuvem.addImage(nuvemImage);
    nuvem.velocityX = -2;
    nuvem.lifetime = 200;

  }
}

function spawnArvore() {

  if (frameCount % 100 == 0) {


    numeroAleatorio = Math.round(random(1, 6));
    arvore = createSprite(600, 158);
    arvoreGrupo.add(arvore);
    
    arvore.velocityX = -(3 +pontos/100);
    arvore.scale = 0.5;
    arvore.lifetime = 300;

    switch (numeroAleatorio) {
      case 1:
        arvore.addImage(arvoreImage1);
        break;
      case 2:
        arvore.addImage(arvoreImage2);
        break;
      case 3:
        arvore.addImage(arvoreImage3);
        break;
      case 4:
        arvore.addImage(arvoreImage4);
        break;
      case 5:
        arvore.addImage(arvoreImage5);
        break;
      case 6:
        arvore.addImage(arvoreImage6);
        break;
      default:
        console.log("Numero invalido!");
    }

  }
}




