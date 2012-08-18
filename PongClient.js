function PongClient() {
	this.playArea;
	this.ball;
	this.myPaddle;
	this.opponentPaddle;
	this.delay;
}

PongClient.prototype.initNetwork = function() {
}

PongClient.prototype.initGUI = function() {
	while(document.readyState !== "complete") {console.log("loading...");};

	// Create canvas element
	this.playArea = document.createElement('canvas');
	this.playArea.height = Pong.HEIGHT;
	this.playArea.width = Pong.WIDTH;
	document.body.appendChild(this.playArea);

	// Add event handlers
	var gameObj = this;
	this.playArea.addEventListener('mousemove', function(e) {
													gameObj.onMouseMove(e);
												}, false);
	this.playArea.addEventListener('mousedown', function(e) {
													 gameObj.onMouseClick(e);
												 }, false);
}

PongClient.prototype.onMouseMove = function(e) {
	var canvasMinX = this.playArea.offsetLeft;
	var canvasMaxX = canvasMinX + this.playArea.width;
	var canvasMinY = this.playArea.offsetTop;
	var canvasMaxY = canvasMinX + this.playArea.height;
	var new_mouseX = e.pageX - canvasMinX;
	var new_mouseY = e.pageY - canvasMinY;

	//console.log("Mouse moved: (" + new_mouseX + "," + new_mouseY + ")");

	this.myPaddle.move(new_mouseX);
	/*
	this.updateStates(this.ball.x, this.ball.y,
					  new_mouseX, this.myPaddle.y,
					  this.opponentPaddle.x, this.opponentPaddle.y);
	*/
}

PongClient.prototype.onMouseClick = function(e) {
	console.log("clicked");
	console.log(this);
	if (!this.ball.isMoving())
		this.ball.startMoving();

	// else, do nothing. It's already playing!
}

PongClient.prototype.processKeyEvent = function(e) {
	// Delay function not ready
}

PongClient.prototype.updateStates = function(ballX, ballY, myPaddleX, myPaddleY, opponentPaddleX, opponentPaddleY) {
	this.ball.x = ballX;
	this.ball.y = ballY;
	this.myPaddle.x = myPaddleX;
	this.myPaddle.y = myPaddleY;
	this.opponentPaddle.x = opponentPaddleX;
	this.opponentPaddle.y = opponentPaddleY;
}

PongClient.prototype.run = function() {
	// Bot move!
	this.opponentPaddle.move(this.ball.x);

	// Update ball position
	if (this.ball.isMoving()) {
		this.ball.moveOneStep(this.opponentPaddle, this.myPaddle);
	}

	// Get context
	var context = this.playArea.getContext('2d');

	// Clears the playArea
	context.clearRect(0, 0, this.playArea.width, this.playArea.height);

	// Draw playArea border
	context.strokeRect(0, 0, this.playArea.width, this.playArea.height);

	// Draw the items
	context.drawImage(Sprites.ball[0], this.ball.x - Ball.WIDTH/2, this.ball.y - Ball.HEIGHT/2, Ball.WIDTH, Ball.HEIGHT);
	context.drawImage(Sprites.paddle[0], this.myPaddle.x - Paddle.WIDTH/2, this.myPaddle.y - Paddle.HEIGHT/2, Paddle.WIDTH, Paddle.HEIGHT);
	context.drawImage(Sprites.paddle[0], this.opponentPaddle.x - Paddle.WIDTH/2, this.opponentPaddle.y - Paddle.HEIGHT/2, Paddle.WIDTH, Paddle.HEIGHT);

	// Run this function again after (1/FRAME_RATE) seconds
	setTimeout("client.run()", 1000/Pong.FRAME_RATE);
}

PongClient.prototype.paint = function(g) {
}

PongClient.prototype.update = function(g) {
	paint(g);
}

PongClient.prototype.play = function() {
	// Initialize objects in game
	this.ball = new Ball();
	this.myPaddle = new Paddle(Pong.HEIGHT);
	this.opponentPaddle = new Paddle(Paddle.HEIGHT);

	this.initGUI();
	this.initNetwork();
	this.run();
}

// "public static void main(String[] args)"
// This will auto run after this script is loaded
var client = new PongClient();
client.play();