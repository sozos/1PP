function Paddle(yPos){
	this.sprite;
	this.x;
	this.y;

	// CONSTRUCTOR
	// Creates new paddle
	this.x = Pong.WIDTH/2;
	this.y = yPos - Paddle.HEIGHT/2;
}

Paddle.WIDTH = 60;
Paddle.HEIGHT = 16;
Paddle.R1 = 5;
Paddle.R2 = 10;
Paddle.R3 = 25;

// Move paddle
Paddle.prototype.move = function(newx) {
	if (newx < Paddle.WIDTH/2)
		this.x = Paddle.WIDTH/2;
	else if (newx > Pong.WIDTH - Paddle.WIDTH/2)
		this.x = Pong.WIDTH - Paddle.WIDTH/2;
	else
		this.x = newx;
}