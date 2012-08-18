function Ball() {
	this.sprite;
	this.x;
	this.y;
	this.vx;
	this.vy;
	this.moving;

	// Private function
	this.updateVelocity = function(px) {
		//console.log("Before: (vx, vy): (" + this.vx + "," + this.vy + ")");
		if (this.x >= px - Paddle.R1 && this.x <= px + Paddle.R1) {
            this.vy = -this.vy;
        } else if (this.x >= px - Paddle.R2 && this.x <= px + Paddle.R2) {
            this.vx += (this.x > px? 1 : -1);
            this.vy = -this.vy;
        } else if (this.x >= px - Paddle.R3 && this.x <= px + Paddle.R3) {
            this.vx += (this.x > px? 2 : -2);
            this.vy = -this.vy;
        } else if (this.x + Ball.WIDTH/2 >= px - Paddle.WIDTH/2 && this.x - Ball.WIDTH/2 <= px + Paddle.WIDTH/2) {
            this.vx += (this.x > px? 3 : -3);
            this.vy = -this.vy;
        }
        //console.log("After: (vx, vy): (" + this.vx + "," + this.vy + ")");
	}

	// CONSTRUCTOR
	this.x = Pong.WIDTH/2;
	this.y = Pong.HEIGHT/2;
	this.vx = 0;
	this.vy = 0;
	this.moving = false;
}

Ball.WIDTH = 10;
Ball.HEIGHT = 10;
Ball.VERTICAL_VELOCITY = 7;

Ball.prototype.startMoving = function(){
	this.vx = 0;
	this.vy = Ball.VERTICAL_VELOCITY;
	this.moving = true;
}

Ball.prototype.isMoving = function() {
	return this.moving;
}

Ball.prototype.moveOneStep = function(topPaddle, bottomPaddle) {
	// New position
	this.x += this.vx;
	this.y += this.vy;

	// Check for bouncing
	if (this.x <= Ball.WIDTH/2 || this.x >= Pong.WIDTH - Ball.WIDTH/2) {
		// Bounds off horizontally
		this.vx = -this.vx;
	} else if (this.y + Ball.HEIGHT/2 > Pong.HEIGHT || this.y - Ball.HEIGHT/2 < 0) {
		// Goes out of bound! Lose point and restart.
		this.x = Pong.WIDTH/2;
		this.y = Pong.HEIGHT/2;
		this.vx = 0;
		this.vy = 0;
		this.moving = false;
	} else if (this.y - Ball.HEIGHT/2 < Paddle.HEIGHT) {
		// Ball collides with top paddle.
		// Change direction (vx) depending on collision point between ball and paddle
		this.updateVelocity(topPaddle.x);
	} else if (this.y + Ball.HEIGHT/2 > Pong.HEIGHT - Paddle.HEIGHT) {
		// Ball collides with top paddle.
		// Change direction (vx) depending on collision point between ball and paddle
		this.updateVelocity(bottomPaddle.x);
	}
}