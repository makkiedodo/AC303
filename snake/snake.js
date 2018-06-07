$(document).ready(function(){
	var canvas = document.getElementById("myCanvas");

	var context = canvas.getContext("2d");

	var gridNum = 20;
	var gridSize = canvas.width / gridNum;

	var player = {
		tail: 1,
		x: 7,
		y: 7,
	
direction: 5,
alive: true
	}
var candy = {
	x:0,
	y:0,
	alive: false
}

var snakeBody = [ [7,7] ]

var keyPressed = null;
var leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;

Array.prototype.insert = function(index, item){
	this.splice(index,0, item);
}

function update(){
	if(keyPressed){
		if(keyPressed == rightKey && player.direction != 1)player.direction = 0;
		if(keyPressed == leftKey && player.direction != 0)player.direction = 1;
		if(keyPressed == upKey && player.direction != 3)player.direction = 2;
		if(keyPressed == downKey && player.direction != 2)player.direction = 3;


	}
	if(!candy.alive){

		candy.x = Math.floor(Math.random()*gridNum);
		candy.y = Math.floor(Math.random()*gridNum);

		var collided
		do{
		collided = false;
			for(var i =0; i < player.tail; i++){
				if(candy.x == snakeBody [i] [0] && candy.y == snakeBody[i][1]){
					candy.x = Math.floor(Math.random()*gridNum);
					candy.y = Math.floor(Math.random()*gridNum);
					collided = true;
					break;
				}
			}


			}while(collided);

			candy.alive = true;
	}
	if(candy.x == player.x && candy.y == player.y){
		candy.alive = false;
		player.tail++

		for(var i = 1; i < player.tail; i++){
			if(player.x == snakeBody[i][0] && player.y == snakeBody[i][1]){
				player.alive = false;
				clearInterval(updates);
			}
		}


	}

	if(player.x < 0 || player.x >= gridNum || player.y <0 || player.y >= gridNum){
		player.alive = false;
		clearInterval(updates);
	}

snakeBody.insert(0,[player.x, player.y]);
while(snakeBody.length  > player.tail+1){
snakeBody.pop();
	}

	switch(player.direction){

		case 0:
		player.x += 1; break;

		case 1:
		player.x -= 1;break;

		case 2:
		player.y -= 1; break;

		case 3:
		player.y += 1; break;
	}

if(player.alive){
	draw();
}

}

function draw(){

context.clearRect(0,0,canvas.width, canvas.height);

context.fillStyle = "red";
context.fillRect(candy.x *gridSize,candy.y *gridSize, gridSize, gridSize)

for(var i =0; i < player.tail; i++){
context.fillStyle = "black";
context.fillRect(snakeBody[i][0]*gridSize,snakeBody[i][1] *gridSize,gridSize, gridSize)


}

}

$(window).on("keydown", function(event){
	keyPressed = event.which;
})

update();
var updates = setInterval(update,100);















})