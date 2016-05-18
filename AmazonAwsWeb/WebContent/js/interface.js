var screen = [""];
var cursor = "_";
var prompt = "> ";
var promptWidth = 0;
var speed = 0;
var ctx = null;
var canvas = null;
var termFont = "18px VT323";
var termFillStyle = "rgba(0, 255, 156, 1.0)";
var termWidth = 80;
var termHeight = 24;
var lineHeight = 15;
var topBuffer = 10;
var leftBuffer = 10;

function startInterface() {
	
	//Set up keyboard and start drawing
	$.getScript("js/keycodes.js",function() {
		$.getScript("js/keystrokes.js", function() {
			initCanvas();
		});
	});
	
}

function initCanvas() {
	canvas = $("#textInterface")[0];
	
	if(canvas.getContext) {
		console.log("Drawing with 2d canvas.");
		ctx = canvas.getContext("2d");
		$(document).keydown(onKeyDown);
		$(document).keyup(onKeyUp);
		$("#btn_clear").click(clearScreen);
		clear();
	} else {
		console.log("No canvas.");
		canvas.html("Text here");
	}
}

function initDimensions() {

	devicePixelRatio = window.devicePixelRatio || 1,
    backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    	ctx.mozBackingStorePixelRatio ||
    	ctx.msBackingStorePixelRatio ||
    	ctx.oBackingStorePixelRatio ||
    	ctx.backingStorePixelRatio || 1,

    ratio = devicePixelRatio / backingStoreRatio;
	
	//clientWidth, offsetWidth
	var oldWidth = canvas.clientWidth;
    var oldHeight = canvas.clientHeight;

    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;

    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';
    ctx.scale(ratio, ratio);	
}

function initFont() {
	ctx.fillStyle = termFillStyle;
	ctx.font = termFont;
	promptWidth = Math.ceil(ctx.measureText(prompt).width);
}

function clear() {	
	initDimensions();
	initFont();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearScreen() {
	clear();
	screen = [""];
	drawScreenText();
}

function draw() {
	drawScreenText();
	drawCursor();
} 

function drawScreenText() {	
	for(var i = 0; i < screen.length && i < termHeight; i++) {
		ctx.fillText(prompt,leftBuffer,(lineHeight*i)+topBuffer);
		ctx.fillText(screen[i],promptWidth+leftBuffer,(lineHeight*i)+topBuffer);
	}
}

function drawCursor() {
	var line = getCurrLine();
	var cursorPos = ctx.measureText(line).width + promptWidth + leftBuffer;
	ctx.fillText(cursor,cursorPos,(lineHeight*screen.length)+topBuffer);
}

function getCurrLine() {
	return screen[screen.length-1];
}

function setCurrLine(line) {
	screen[screen.length-1] = line;
}

function appendCurrLine(c) {
	var line = getCurrLine();
	line += c;
	setCurrLine(line);
}
