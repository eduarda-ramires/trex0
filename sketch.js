/*ATIVIDADE
1 - CRIAR SPRITE DE FUNDO DA TELA (GROUND)
    - criar variável ground (sprite) e groundImage (animação)
    - carregar a imagem para a animação
    - criar uma sprite e colocar a animação dentro
    - arrumar a posição em x dela
    - dar velociade 
2 - ARRUMAR TAMANHO E POSIÇÃO DO TREX
    
3 - CRIAR ANIMAÇÃO TREX COLIDIU (MORREU)
    - criar variavel trex_collided
    - carregar uma imagem para dentro da variável

*/
//declarar variaveis
var trex ,trex_running;

function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");

}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(100, 150);
  trex.addAnimation("correndo", trex_running);
 
}

function draw(){
  background("white")
  drawSprites();

}
