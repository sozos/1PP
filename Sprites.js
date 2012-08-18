var Sprites = {
	ball : new Array(),
	paddle : new Array()
}

console.log("Loading sprites...");

// Variable used to initialise images before pushing into array
var img;

// Push ball related sprites here. Can push more if needed to simulate motion
img = new Image();
img.src = "ball.png";
Sprites.ball.push(img);

// Push paddle related sprites here. Can push more if needed to simulate motion
img = new Image();
img.src = "stick.png";
Sprites.paddle.push(img);

console.log("Sprites are loaded.");