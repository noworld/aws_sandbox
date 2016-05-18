var shift = false;
var ctrl = false;
var alt = false;
var ltWin = false;
var rtWin = false;
var caps = false;
var num = true;
var scroll = false;

function onKeyDown(e) {
	var key = e.keyCode;

	//Function keys
	if(key >= 112 && key <= 135) {
		return;
	}
	
	switch(key) {
	case 3: keyDownBreak();
		break;
	case 8: keyDownBS();
		break;
	case 9: keyDownTab();
		break;
	case 20: keyDownCaps();
		break;
	case 13: keyDownEnter();
		break;
	case 16: keyDownShift();
		break;
	case 17: keyDownCtrl();
		break;
	case 18: keyDownAlt();
		break;
	case 19: keyDownPauseBreak();
		break;
	case 27: keyDownEsc();
		break;
	case 33: keyDownPgUp();
		break;
	case 34: keyDownPgDn();
		break;
	case 35: keyDownEnd();
		break;
	case 36: keyDownHome();
		break;
	case 37: keyDownLtAr();
		break;
	case 38: keyDownUpAr();
		break;
	case 39: keyDownRtAr();
		break;
	case 40: keyDownDnAr();
		break;
	case 45: keyDownIns();
		break;
	case 46: keyDownDel();
		break;
	case 91: keyDownLtWin();
		break;
	case 92: keyDownRtWin();
		break;
	case 92: keyDownMenu();
		break;
	case 144: keyDownNum();
		break;
	case 145: keyDownScroll();
		break;
	default: appendScreen(key);
		break;
	}

	e.preventDefault();
	clear();
	drawScreenText();
}

function appendScreen(key) {
	var rowIdx = screen.length-1;
	
	if(screen[rowIdx].length >= termWidth) {
		sreen.push("");
		rowIdx = screen.length-1;
	}
	
	if(shift || caps) {
		screen[rowIdx] += shiftKeyCodes[key];
	} else {
		screen[rowIdx] += keyCodes[key];
	}
}

function onKeyUp(e) {
	var key = e.keyCode;		

	switch(key) {
	case 16: keyUpShift();
		break;
	case 17: keyUpCtrl();
		break;
	case 18: keyUpAlt();
		break;
	case 91: keyUpLtWin();
		break;
	case 92: keyUpRtWin();
		break;
	default: 
		break;
	}
}


function keyDownBreak() {
	
}

function keyDownPauseBreak() {
	
}

function keyDownBS() {
	var line = screen[screen.length-1];
	if(line.length > 0) {
		line = line.substring(0,line.length-1);
	}
	screen[screen.length-1] = line;
}

function keyDownCaps() {
	caps = !caps;
}

function keyDownScroll() {
	scroll = !scroll;
}

function keyDownEnter() {
	screen.push("");
}

function keyDownShift() {
	shift = true;
}

function keyDownCtrl() {
	ctrl = true;
}

function keyDownAlt() {
	alt = true;
}

function keyDownLtWin() {
	ltWin = true;
}

function keyDownRtWin() {
	rtWin = true;
}

function keyDownNum() {
	num = !num;
}

function keyDownDel() {
	
}

function keyDownTab() {
	
}

function keyDownEsc() {
	
}

function keyDownPgUp() {
	
}

function keyDownPgDn() {
	
}

function keyDownEnd() {
	
}

function keyDownHome() {
	
}

function keyDownLtAr() {
	
}

function keyDownRtAr() {
	
}

function keyDownUpAr() {
	
}

function keyDownDnAr() {
	
}

function keyDownIns() {
	
}

function keyDownMenu() {
	
}

function keyUpShift() {
	shift = false;
}

function keyUpCtrl() {
	ctrl = false;
}

function keyUpAlt() {
	alt = false;
}

function keyUpLtWin() {
	ltWin = false;
}

function keyUpRtWin() {
	rtWin = false;
}