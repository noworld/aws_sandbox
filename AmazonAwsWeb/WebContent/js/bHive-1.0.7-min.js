function bHive(a){this.setStageDimensions(a.width,a.height);this.setStageObject(a.domobject);this.init();for(var c in a){this[c]=a[c]}if(a.hasOwnProperty("backgroundColor")){this.setStageColor(a.backgroundColor)}if(a.hasOwnProperty("globalCompositeOperation")){this.setGlobalComposite(a.globalCompositeOperation)}}bHive.fn=bHive.prototype={stageTarget:null,stageObject:null,stage2d:null,undef:"undefined",defGA:1,clearFrame:true,debug:false,KEYUP:38,KEYDOWN:40,KEYLEFT:37,KEYRIGHT:39,SPACE:32,KEYA:65,KEYS:83,KEYW:87,KEYD:68,KEYENTER:13,KEYESCAPE:27,_objects:[],_events:[],_triggers:[],_radians:Math.PI/180,_nomouse:false,_mouseX:0,_mouseY:0,_touchX:0,_touchY:0,_stageHeight:320,_stageWidth:256,_frameRate:33,_requestAnimFrame:null,_fpsInterval:new Date().getTime(),_fps:0,_fpscounter:0,_currentFrame:0,_initialisedAt:null,_loopIdent:null,_loopFunction:null,_gfxLibrary:[],_gfxErrorCount:0,_gfxLoaded:0,_ready:false,_globalCompositeOperation:"source-over",init:function(){this.stageObject=document.createElement("canvas");this.stage2d=this.stageObject.getContext("2d");this.stageObject.height=this.sh=this._stageHeight;this.stageObject.width=this.sw=this._stageWidth;this.stage2d.globalAlpha=this.defGA;var a=this;this.bind(this.stageObject,"mousemove",function(c){return function(d){d.preventDefault();c.mouseMover(d,c)}}(a),true);this.bind(this.stageObject,"click",function(c){return function(d){d.preventDefault();c.mouseClick(d,c)}}(a),true);this.bind(this.stageObject,"mousedown",function(c){return function(d){d.preventDefault();c.mouseDown(d,c)}}(a),true);this.bind(this.stageObject,"mouseup",function(c){return function(d){d.preventDefault();c.mouseUp(d,c)}}(a),true);this.bind(window,"keydown",function(c){return function(d){c.keyDown(d,c)}}(a),true);this.bind(window,"keyup",function(c){return function(d){c.keyUp(d,c)}}(a),true);this.bind(this.stageObject,"touchstart",function(c){return function(d){event.preventDefault();c.touchStart(d,c)}}(a),true);this.bind(this.stageObject,"touchmove",function(c){return function(d){event.preventDefault();c.touchMove(d,c)}}(a),true);this.bind(this.stageObject,"touchend",function(c){return function(d){event.preventDefault();c.touchEnd(d,c)}}(a),true);this.bind(this.stageObject,"touchcancel",function(c){return function(d){event.preventDefault();c.touchCancel(d,c)}}(a),true);this.bind(this.stageObject,"gesturestart",function(c){return function(d){event.preventDefault();c.gestureStart(d,c)}}(a),true);this.bind(this.stageObject,"gesturemove",function(c){return function(d){event.preventDefault();c.gestureMove(d,c)}}(a),true);this.bind(this.stageObject,"gestureend",function(c){return function(d){event.preventDefault();c.gestureEnd(d,c)}}(a),true);this.attachStage();this._initialisedAt=new Date()},bind:function(d,c,e,a){if(document.addEventListener){d.addEventListener(c,e,a)}else{if(document.attachEvent){d.attachEvent("on"+c,e,a)}}},unbind:function(c,a,d){if(document.removeEventListener){c.removeEventListener(a,d,false)}else{if(document.detachEvent){c.detachEvent("on"+a,d,false)}}},addEventListener:function(c,a){this._events[c]=a},hideMouse:function(){this.stageObject.style.cursor="none"},showMouse:function(){this.stageObject.style.cursor="pointer"},sizeof:function(d){var c=0;var e=/function (.{1,})\(/;for(var a in d){result=e.exec(d[a].constructor.toString());if(result!=null&&result[1]=="Array"){c+=this.sizeof(d[a])}else{c++}}return c},MouseEvent:function(a){this.e=(a)?a:window.event;this.x=(a.PageX)?a.PageX:a.clientX;this.y=(a.PageY)?a.PageY:a.clientY;this.target=(a.target)?a.target:a.srcElement;this.button=(a.button)?a.button:a.button},MouseWheelEvent:function(a){this.e=(a)?a:window.event;this.delta=(a.detail)?a.detail*-1:a.wheelDelta/40},KeyEvent:function(a){this.keyCode=(a.keyCode)?a.keyCode:a.which;this.altKey=(a.altKey)?true:false;this.altLeft=(a.altLeft)?true:false;this.ctrlKey=(a.ctrlKey)?true:false;this.ctrlLeft=(a.ctrlLeft)?true:false;this.shiftKey=(a.shiftKey)?true:false;this.shiftLeft=(a.shiftLeft)?true:false},mainController:function(){var d=this;var a=this.stage2d;var c=(new Date().getTime()-d._fpsInterval)/1000;d._currentFrame++;d._fpscounter++;this.despatchTriggers();if(c>1){d._fps=Math.floor((d._fpscounter/c)*10)/10;d._fpsInterval=new Date().getTime();d._fpscounter=0}if(d.clearFrame){a.clearRect(0,0,d._stageWidth,d._stageHeight)}if(typeof this._loopFunction=="function"){d._loopFunction.call(d)}},despatchTriggers:function(){var e=this.getFrame();var c=new Date().getTime();var f=false;for(var d=0,a=this._triggers.length;d<a;d++){ct=this._triggers[d];if(ct.isTime){if(c>=ct.runAt){ct.func();f=true}}else{if(e>=ct.runAt){ct.func();f=true}}if(f){this._triggers.splice(d,1);f=false}}},trigger:function(a,c,i){i=(i===undefined)?true:i;var d=new Date().getTime();var j=this.getFrame();var h={};var e=0;if(i){e=d+c}else{e=j+c}h.func=a;h.runAt=e;h.isTime=i;this._triggers.push(h);return this._triggers.length-1},getFPS:function(){return this._fps},getFrameRate:function(){return this._frameRate},getSystemTime:function(){return this._initialisedAt.getTime()},getFrame:function(){return this._currentFrame},getPosition:function(c){var a=curTop=0;if(c.offsetParent){do{a+=c.offsetLeft;curTop+=c.offsetTop}while(c=c.offsetParent)}else{a=c.offsetLeft;curTop=c.offsetTop}return[a,curTop]},mouseMover:function(f,c){this.engine=c;f=new this.engine.MouseEvent(f);var h=this.engine.getPosition(this.stageObject);this._mouseX=f.x-h[0];this._mouseY=f.y-h[1];if(typeof this._events.onmousemove!=this.undef){this._events.onmousemove.apply(this,[{x:this._mouseX,y:this._mouseY}])}for(var a in this._objects){xIn=yIn=false;var d=this._objects[a];if(d instanceof bHive.Clip){parentX=(typeof d.parent!=this.undef)?d.parent.x:0;parentY=(typeof d.parent!=this.undef)?d.parent.y:0;if(this._mouseX>parentX+d.x&&this._mouseX<parentX+d.x+d.width()){xIn=true}if(this._mouseY>parentY+d.y&&this._mouseY<parentY+d.y+d.height()){yIn=true}if((xIn&&yIn)&&!d._mouseover){if(typeof d.events.onmouseover=="function"){d.events.onmouseover.apply(d,[{x:this._mouseX,y:this._mouseY}])}d._mouseover=true}if((!xIn||!yIn)&&d._mouseover){if(typeof d.events.onmouseout=="function"){d.events.onmouseout.apply(d,[{x:this._mouseX,y:this._mouseY}])}d._mouseover=false}}}},mouseClick:function(f,c){this.engine=c;f=new this.engine.MouseEvent(f);xIn=yIn=false;if(typeof this._events.onclick!=this.undef){this._events.onclick.apply(this,[{x:this._mouseX,y:this._mouseY}])}for(var a in this._objects){xIn=yIn=false;var d=this._objects[a];if(d instanceof bHive.Clip){parentX=(typeof d.parent!=this.undef)?d.parent.x:0;parentY=(typeof d.parent!=this.undef)?d.parent.y:0;if(this._mouseX>parentX+d.x&&this._mouseX<parentX+d.x+d.width()){xIn=true}if(this._mouseY>parentY+d.y&&this._mouseY<parentY+d.y+d.height()){yIn=true}if((xIn&&yIn)&&typeof d.events.onclick=="function"){d.events.onclick.apply(d,[{x:this._mouseX,y:this._mouseY}])}}}},mouseDown:function(f,c){this.engine=c;f=new this.engine.MouseEvent(f);xIn=yIn=false;if(typeof this._events.mousedown!=this.undef){this._events.mousedown.apply(this,[{x:this._mouseX,y:this._mouseY}])}for(var a in this._objects){var d=this._objects[a];if(d instanceof bHive.Clip){if(this._mouseX>d.x&&this._mouseX<d.x+d.width()){xIn=true}if(this._mouseY>d.y&&this._mouseY<d.y+d.height()){yIn=true}if(xIn&&yIn&&typeof d.events.mousedown=="function"){d.events.mousedown({x:this._mouseX,y:this._mouseY,src:d})}}}},mouseUp:function(f,c){this.engine=c;f=new this.engine.MouseEvent(f);xIn=yIn=false;if(typeof this._events.mouseup!=this.undef){this._events.mouseup.apply(this,[{x:this._mouseX,y:this._mouseY}])}for(var a in this._objects){var d=this._objects[a];if(d instanceof bHive.Clip){if(this._mouseX>d.x&&this._mouseX<d.x+d.width()){xIn=true}if(this._mouseY>d.y&&this._mouseY<d.y+d.height()){yIn=true}if(xIn&&yIn&&typeof d.events.mouseup=="function"){d.events.mouseup({x:this._mouseX,y:this._mouseY,src:d})}}}},keyDown:function(f,c){this.engine=c;f=new this.engine.KeyEvent(f);if(typeof this._events.onkeydown!=this.undef){this._events.onkeydown.apply(this,[f])}for(var a in this._objects){var d=this._objects[a];if(d instanceof bHive.Clip){if(typeof d.events.onkeydown=="function"){d.events.onkeydown(f)}}}},keyUp:function(f,c){this.engine=c;f=new this.engine.KeyEvent(f);if(typeof this._events.onkeyup!=this.undef){this._events.onkeyup.apply(this,[f])}for(var a in this._objects){var d=this._objects[a];if(d instanceof bHive.Clip){if(typeof d.events.onkeyup=="function"){d.events.onkeyup(f)}}}},touchStart:function(f,c){this.engine=c;var j=f.touches[0];xIn=yIn=false;var h=this.engine.getPosition(this.stageObject);this._touchX=j.pageX-h[0];this._touchY=j.pageY-h[1];if(typeof this._events.touchstart!=this.undef){this._events.touchstart.apply(this,[{x:this._touchX,y:this._touchY}])}for(var a in this._objects){var d=this._objects[a];if(d instanceof bHive.Clip){if(this._touchX>d.x&&this._touchX<d.x+d.width()){xIn=true}if(this._touchY>d.y&&this._touchY<d.y+d.height()){yIn=true}if(xIn&&yIn&&typeof d.events.touchstart=="function"){d.events.touchstart({x:this._touchX,y:this._touchY,src:d})}}}},touchMove:function(f,c){this.engine=c;var j=f.touches[0];var h=this.engine.getPosition(this.stageObject);this._touchX=j.pageX-h[0];this._touchY=j.pageY-h[1];if(typeof this._events.touchmove!=this.undef){this._events.touchmove.apply(this,[{x:this._touchX,y:this._touchY}])}for(var a in this._objects){xIn=yIn=false;var d=this._objects[a];if(d instanceof bHive.Clip){parentX=(typeof d.parent!=this.undef)?d.parent.x:0;parentY=(typeof d.parent!=this.undef)?d.parent.y:0;if(this._touchX>parentX+d.x&&this._touchX<parentX+d.x+d.width()){xIn=true}if(this._touchY>parentY+d.y&&this._touchY<parentY+d.y+d.height()){yIn=true}if((xIn&&yIn)&&!d._touched){if(typeof d.events.touchmove=="function"){d.events.touchmove.apply(d,[{x:this._touchX,y:this._touchY}])}d._touched=true}if((!xIn||!yIn)&&d._touched){if(typeof d.events.touchout=="function"){d.events.touchout.apply(d,[{x:this._touchX,y:this._touchY}])}d._mouseover=false}}}},touchEnd:function(f,c){this.engine=c;var j=f.touches[0];var h=this.engine.getPosition(this.stageObject);this._touchX=j.pageX-h[0];this._touchY=j.pageY-h[1];if(typeof this._events.touchend!=this.undef){this._events.touchend.apply(this,[{x:this._touchX,y:this._touchY,src:d}])}for(var a in this._objects){var d=this._objects[a];if(d instanceof bHive.Clip){if(this._touchX>d.x&&this._touchX<d.x+d.width()){xIn=true}if(this._touchY>d.y&&this._touchY<d.y+d.height()){yIn=true}if(xIn&&yIn&&typeof d.events.touchend=="function"){d.events.touchend({x:this._touchX,y:this._touchY,src:d})}}}},gestureStart:function(c,a){this.engine=a},gestureMove:function(c,a){this.engine=a},gestureEnd:function(c,a){this.engine=a},include:function(c){var a=document.createElement("script");a.src=c;a.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(a)},setStageDimensions:function(a,c){this._stageHeight=c;this._stageWidth=a},setStageColor:function(a){this._stageColor=a;this.stageObject.style.backgroundColor=a},setGlobalComposite:function(a){this._globalCompositeOperation=a;this.stage2d.globalCompositeOperation=a},setStageObject:function(a){if(typeof a=="string"){var c=document.getElementById(a);if(c!==this.undef){this.stageTarget=c}else{}}else{this.stageTarget=a}},attachStage:function(){this.stageTarget.appendChild(this.stageObject)},storeObject:function(c){var a=this._objects.length;this._objects.push(c);return this._objects[a]},createClip:function(a){var c=this;return this.storeObject(new bHive.Clip(a,c))},createVideo:function(a){var c=this;return this.storeObject(new bHive.Video(a,c))},createSound:function(a){var c=this;return this.storeObject(new bHive.Sound(a,c))},createSprite:function(a){var c=this;return this.storeObject(new bHive.Sprite(a,c))},createBitmap:function(a){var c=this;return this.storeObject(new bHive.Bitmap(a,c))},createLine:function(a){var c=this;return this.storeObject(new bHive.Line(a,c))},createText:function(a){var c=this;return this.storeObject(new bHive.Text(a,c))},createShape:function(a){var c=this;return this.storeObject(new bHive.Shape(a,c))},createGradient:function(a){var c=this;return this.storeObject(new bHive.Gradient(a,c))},theLoop:function(c){var a=this;this._loopFunction=c;this._requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame})();if(typeof this._requestAnimFrame!=this.undef){this._loopIdent=function(d){return function(){func=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;func(d._loopIdent);d.mainController()}}(a);this._loopIdent()}else{this._loopIdent=setInterval(function(d){return function(){d.mainController()}}(a),this._frameRate)}},getRotatedSize:function(a){radians=(2*Math.PI*a.rotation)/360;cosine=Math.cos(radians);sine=Math.sin(radians);objNH=a.image.naturalHeight;objNW=a.image.naturalWidth;point1_x=-objNH*sine;point1_y=objNH*cosine;point2_x=objNW*cosine-objNH*sine;point2_y=objNH*cosine+objNW*sine;point3_x=objNW*cosine;point3_y=objNW*sine;minx=Math.min(0,Math.min(point1_x,Math.min(point2_x,point3_x)));miny=Math.min(0,Math.min(point1_y,Math.min(point2_y,point3_y)));maxx=Math.max(point1_x,Math.max(point2_x,point3_x));maxy=Math.max(point1_y,Math.max(point2_y,point3_y));rotwidth=Math.round(maxx-minx);rotheight=Math.round(maxy-miny);return{width:rotwidth,height:rotheight}},hex2RGBa:function(d,f){var e=g=b=0;var c=1;if(f>100){f=100}else{if(f<0){f=0}}c=f/100;d=(d.charAt(0)=="#")?d.substring(1,d.length):d;if(d.length==3){e=parseInt(d.substring(0,1)+d.substring(0,1),16);g=parseInt(d.substring(1,2)+d.substring(1,2),16);b=parseInt(d.substring(2,3)+d.substring(2,3),16)}else{e=parseInt(d.substring(0,2),16);g=parseInt(d.substring(2,4),16);b=parseInt(d.substring(4,6),16)}return"rgba("+e+", "+g+", "+b+", "+c+")"},clone:function(d){var c=this;function a(){}a.prototype=d;return this.storeObject(new a())},Tween:function(h,j,c,a,f,i){if(!arguments.length){return false}var d=this;var e=new bHive.Tween();e.engine=d;e.obj=h;e.prop=j;e.begin=c;e.position=c;e.end=a;e.duration=f;e.isTime=i;e.start();return e}};bHive.Tween=function(){this._date=new Date();this.events=[]};bHive.Tween.prototype={engine:null,obj:null,prop:null,begin:0,position:0,end:0,change:0,duration:0,isTime:true,isPlaying:false,looping:false,events:null,time:0,func:function(e,a,h,f){return h*e/f+a},_startTime:0,_time:0,_oldTime:0,_loopIdent:0,_oldPos:0,_date:null,start:function(){this.reset();this.startLoop()},stop:function(){this.stopLoop()},startLoop:function(){var c=this;var a;if(!this.isTime){a=this.engine._frameRate}else{a=Math.round((this.duration*1000)/this.engine._frameRate)}this._loopIdent=setInterval(function(d){return function(){d.updateTime()}}(c),a);this.isPlaying=true},stopLoop:function(){this.isPlaying=false;clearInterval(this._loopIdent);if(typeof this.events.complete=="function"){this.events.complete()}},reset:function(){t=(isNaN(arguments[0]))?0:parseInt(arguments[0]);this._time=t;this.change=this.end-this.begin;this.fixTime();this.updateFrame()},fixTime:function(){if(this.isTime){var a=new Date().getTime();this._startTime=a-this._time*1000}},updateTime:function(){this._oldTime=this._time;if(this.isTime){var a=new Date().getTime();this.updateFrame((a-this._startTime)/1000)}else{this.updateFrame(this._time+1)}},updateFrame:function(a){if(a>this.duration){if(this.looping){}else{if(this.isTime){this._time=this.duration;this.setPosition(this.getPosition(this._time))}this.stopLoop()}}else{this.setPosition(this.getPosition(a));if(!this.isTime){this._time++}}},setPosition:function(a){if(typeof this.obj[this.prop]!=this.engine.undef){this.obj[this.prop]=this.position=a}},getPosition:function(a){a=(typeof a==this.engine.undef)?0:a;fr=this.func(a,this.begin,this.change,this.duration);return fr},tweenTo:function(){},addEventListener:function(c,a){this.events[c]=a}};bHive.Bitmap=function(a,e){var d=this;this.engine=e;this.events=[];this.tiles=[];for(var c in a){this[c]=a[c]}this.image=new Image();this.image.src=this.src;this.image.onload=(function(f){return function(){f.width=f.image.naturalWidth;f.height=f.image.naturalHeight;if(typeof f.events.onload!=f.engine.undef){f.events.onload()}}})(d);this.image.onerror=(function(f){return function(){console.log("cannot load: "+f.image.src);if(typeof f.events.onerror!=f.engine.undef){f.events.onerror()}}})(d)};bHive.Bitmap.prototype={engine:null,src:"",image:null,events:null,tiles:null,x:0,y:0,registration_x:0,registration_y:0,rotation:0,visible:true,alpha:100,x_scale:100,y_scale:100,addEventListener:function(c,a){this.events[c]=a},deleteEventListener:function(a){if(typeof this.events[a]!=this.engine.undef){delete this.events[a]}},slice:function(j,i,h,e,d,c,a,f){var a=(typeof a==this.engine.undef)?h:a;var f=(typeof f==this.engine.undef)?e:f;this.engine.stage2d.drawImage(this.image,j,i,h,e,d,c,a,f)},addTile:function(d,h,f,e,c){if(typeof d==this.engine.undef){return false}var a={};a.sx=h;a.sy=f;a.sWidth=e;a.sHeight=c;this.tiles[d]=a},drawTile:function(h,d,c,a,f){if(typeof this.tiles[h]==this.engine.undef){return false}var e=this.tiles[h];var a=(typeof a==this.engine.undef)?e.sWidth:a;var f=(typeof f==this.engine.undef)?e.sHeight:f;this.engine.stage2d.drawImage(this.image,e.sx,e.sy,e.sWidth,e.sHeight,d,c,a,f)},draw:function(d,c){d=(typeof d==this.engine.undef)?0:d;c=(typeof c==this.engine.undef)?0:c;if(this.visible){if(typeof this.parent!=this.engine.undef){pA=this.parent.alpha;A=this.alpha;if(pA<100){newGA=pA;if(A<100){percentage=pA*(A/100);newGA=pA-percentage}this.engine.stage2d.globalAlpha=Math.abs(newGA)/100}else{if(A<100){this.engine.stage2d.globalAlpha=A/100}}}else{if(this.alpha<100){this.engine.stage2d.globalAlpha=this.alpha/100}}iW=this.image.naturalWidth;iH=this.image.naturalHeight;if(typeof this.parent!=this.engine.undef){if(this.x_scale!=100){iW=iW*(this.x_scale/100)}if(this.parent.x_scale!=100){iW=iW*(this.parent.x_scale/100)}}else{if(this.x_scale!=100){iW=iW*(this.x_scale/100)}}if(typeof this.parent!=this.engine.undef){if(this.y_scale!=100){iH=iH*(this.y_scale/100)}if(this.parent.y_scale!=100){iH=iH*(this.parent.y_scale/100)}}else{if(this.y_scale!=100){iH=iH*(this.y_scale/100)}}if(this.rotation!=0){this.engine.stage2d.save();var a=d+this.x;var e=c+this.y;if(this.rotation>360){this.rotation=0}this.engine.stage2d.translate(a,e);this.engine.stage2d.rotate(this.rotation*this.engine._radians);this.engine.stage2d.drawImage(this.image,this.registration_x*-1,this.registration_y*-1,iW,iH);this.engine.stage2d.restore()}else{this.engine.stage2d.drawImage(this.image,d+this.x,c+this.y,iW,iH)}if(this.alpha<100){this.engine.stage2d.globalAlpha=this.engine.defGA}}}};bHive.Clip=function(a,d){this.engine=d;this._childObjects=[];this.events=[];for(var c in a){this[c]=a[c]}};bHive.Clip.prototype={id:null,events:null,visible:true,_childObjects:null,_mouseover:false,alpha:100,x:0,y:0,x_scale:100,y_scale:100,addEventListener:function(c,a){this.events[c]=a},add:function(a){this._childObjects.push(a);var c=this;a.parent=c},draw:function(d,c){d=(typeof d==this.engine.undef)?0:d;c=(typeof c==this.engine.undef)?0:c;if(this.visible){for(var a in this._childObjects){this._childObjects[a].draw(d+this.x,c+this.y)}}},point:function(a,f,c){var c=2*Math.PI*c/360;var e=a*Math.cos(c)+f*Math.sin(c);var d=f*Math.cos(c)-a*Math.sin(c);return[e,d]},width:function(){var a=[];if(this._childObjects.length>0){for(var d in this._childObjects){var c=this._childObjects[d];if(c instanceof bHive.Bitmap){if(c.rotation>0){rotatedDimensions=engine.getRotatedSize(c);a.push(rotatedDimensions.width+c.x)}else{a.push(c.image.naturalWidth+c.x)}}else{if(c instanceof bHive.Clip&&c.visible){a.push(c.width()+c.x)}else{if(c instanceof bHive.Shape&&c.visible){if(c.shape=="square"){a.push(c.width+c.x)}else{if(c.shape=="circle"){a.push(c.x+(c.radius*2))}}}}}}return Math.max.apply(0,a)}else{return 0}},height:function(){var a=[];if(this._childObjects.length>0){for(var d in this._childObjects){var c=this._childObjects[d];if(c instanceof bHive.Bitmap){if(c.rotation>0){rotatedDimensions=engine.getRotatedSize(c);a.push(rotatedDimensions.height+c.y)}else{a.push(c.image.naturalHeight+c.y)}}else{if(c instanceof bHive.Clip){a.push(c.height()+c.y)}else{if(c instanceof bHive.Shape){if(c.shape=="square"){a.push(c.height+c.y)}else{if(c.shape=="circle"){a.push(c.y+(c.radius*2))}}}}}}return Math.max.apply(0,a)}else{return 0}}};bHive.Video=function(a,d){this.engine=d;this.source=[];this.events=[];for(var c in a){this[c]=a[c]}this.createDOMObject()};bHive.Video.prototype={path:"",src:"",alpha:100,x:0,y:0,x_scale:100,y_scale:100,rotation:0,width:0,height:0,registration_x:0,registration_y:0,events:null,formats:["mp4","ogg","webm"],duration:0,currentTime:0,ended:false,muted:false,paused:false,format:"",looping:true,autoplay:true,controls:false,createDOMObject:function(){this.domvid=document.createElement("video");this.domvid.controls=this.controls;this.domvid.autoplay=this.autoplay;this.domvid.style.display="none";var a=this.domvid;this.format=this.supportedFormat();if(this.format!=""){this.domvid.setAttribute("src",this.path+"/"+this.src+"."+this.format);if(this.looping){this.domvid.setAttribute("loop","loop");this.engine.bind(this.domvid,"ended",function(c){return function(d){c.play()}}(a),true)}this.engine.bind(this.domvid,"canplaythrough",function(c){return function(d){console.log(c.height)}}(a),true);document.getElementsByTagName("body")[0].appendChild(this.domvid)}else{return false}},supportedFormat:function(){var d="";for(var c=0,a=this.formats.length;c<a;c++){if(this.domvid.canPlayType("video/"+this.formats[c])=="probably"||this.domvid.canPlayType("video/"+this.formats[c])=="maybe"){d=this.formats[c];break}}return d},pause:function(){if(!this.domvid.paused){this.paused=true;this.domvid.pause()}},play:function(){if(this.domvid.paused){this.paused=false;this.domvid.play()}},draw:function(d,c){d=(typeof d==this.engine.undef)?0:d;c=(typeof c==this.engine.undef)?0:c;if(typeof this.parent!=this.engine.undef){pA=this.parent.alpha;A=this.alpha;if(pA<100){newGA=pA;if(A<100){percentage=pA*(A/100);newGA=pA-percentage}this.engine.stage2d.globalAlpha=Math.abs(newGA)/100}else{if(A<100){this.engine.stage2d.globalAlpha=A/100}}}else{if(this.alpha<100){this.engine.stage2d.globalAlpha=this.alpha/100}}iW=this.width;iH=this.height;if(typeof this.parent!=this.engine.undef){if(this.x_scale!=100){iW=iW*(this.x_scale/100)}if(this.parent.x_scale!=100){iW=iW*(this.parent.x_scale/100)}}else{if(this.x_scale!=100){iW=iW*(this.x_scale/100)}}if(typeof this.parent!=this.engine.undef){if(this.y_scale!=100){iH=iH*(this.y_scale/100)}if(this.parent.y_scale!=100){iH=iH*(this.parent.y_scale/100)}}else{if(this.y_scale!=100){iH=iH*(this.y_scale/100)}}if(this.rotation!=0){this.engine.stage2d.save();var a=d+this.x;var e=c+this.y;if(this.rotation>360){this.rotation=0}this.engine.stage2d.translate(a,e);this.engine.stage2d.rotate(this.rotation*this.engine._radians);this.engine.stage2d.drawImage(this.domvid,this.registration_x*-1,this.registration_y*-1,iW,iH);this.engine.stage2d.restore()}else{this.engine.stage2d.drawImage(this.domvid,d+this.x,c+this.y,iW,iH)}if(this.alpha<100){this.engine.stage2d.globalAlpha=this.engine.defGA}},slice:function(a,i,d,f,e,c){this.engine.stage2d.drawImage(this.domvid,a,i,a+d,i+f,e,c,d,f)}};bHive.Line=function(a,d){this.engine=d;for(var c in a){this[c]=a[c]}};bHive.Line.prototype={weight:1,cap:"butt",corner:"miter",start:null,end:null,visible:true,controlpoints:null,color:"rgba(0,0,0,1)",draw:function(){if(this.start instanceof Array){x1=this.start[0];y1=this.start[1]}else{if(typeof this.start=="string"){switch(this.start){case"mouse":x1=this.engine._mouseX;y1=this.engine._mouseY;break}}else{if(this.start instanceof Object){x1=this.start.x;y1=this.start.y}}}if(this.end instanceof Array){x2=this.end[0];y2=this.end[1]}else{if(typeof this.end=="string"){switch(this.end){case"mouse":x2=this.engine._mouseX;y2=this.engine._mouseY;break}}else{if(this.start instanceof Object){x2=this.end.x;y2=this.end.y}}}if(this.color instanceof bHive.Gradient){if(typeof this.color.dimensions==this.engine.undef){if(this.color.type=="linear"){color=this.engine.stage2d.createLinearGradient(this.x,this.y,this.x+this.width,this.y+this.height)}else{color=this.engine.stage2d.createRadialGradient(this.x+(this.width/2),this.y+(this.height/2),0,this.x+(this.width/2),this.y+(this.height/2),this.width/2)}}else{if(this.color.type=="linear"){color=this.engine.stage2d.createLinearGradient(this.color.dimensions[0],this.color.dimensions[1],this.color.dimensions[2],this.color.dimensions[3])}else{color=this.engine.stage2d.createRadialGradient(this.color.dimensions[0],this.color.dimensions[1],this.color.dimensions[2],this.color.dimensions[3],this.color.dimensions[4],this.color.dimensions[5])}}for(var c=0,a=this.color.colors.length;c<a;c++){color.addColorStop(this.color.stops[c],this.color.colors[c])}}else{color=this.color}this.engine.stage2d.save();this.engine.stage2d.beginPath();this.engine.stage2d.lineWidth=this.weight;this.engine.stage2d.lineCap=this.cap;this.engine.stage2d.lineJoin=this.corner;this.engine.stage2d.strokeStyle=color;if(this.controlpoints==null){this.engine.stage2d.moveTo(x1,y1);this.engine.stage2d.lineTo(x2,y2)}else{if(this.controlpoints.length==1){this.engine.stage2d.moveTo(x1,y1);this.engine.stage2d.quadraticCurveTo(this.controlpoints[0].x,this.controlpoints[0].y,x2,y2)}else{if(this.controlpoints.length==2){this.engine.stage2d.moveTo(x1,y1);this.engine.stage2d.quadraticCurveTo(this.controlpoints[0].x,this.controlpoints[0].y,this.controlpoints[1].x,this.controlpoints[1].y,x2,y2)}}}this.engine.stage2d.stroke();this.engine.stage2d.restore()}};bHive.Text=function(a,d){this.engine=d;for(var c in a){this[c]=a[c]}};bHive.Text.prototype={text:null,x:0,y:0,align:"top",color:"rgb(0, 0, 0)",outline:"rgb(255,0,0)",visible:true,font:"10px Arial",style:"filled",draw:function(c,a){c=(typeof c==this.engine.undef)?0:c;a=(typeof a==this.engine.undef)?0:a;this.engine.stage2d.textBaseline=this.align;this.engine.stage2d.font=this.font;if(this.style=="stroked"){this.engine.stage2d.fillStyle=this.color;this.engine.stage2d.strokeText(this.text,c+this.x,a+this.y)}else{if(this.style=="both"){this.engine.stage2d.fillStyle=this.color;this.engine.stage2d.fillText(this.text,c+this.x,a+this.y);this.engine.stage2d.strokeStyle=this.outline;this.engine.stage2d.strokeText(this.text,c+this.x,a+this.y)}else{this.engine.stage2d.strokeStyle=this.color;this.engine.stage2d.fillText(this.text,c+this.x,a+this.y)}}},};bHive.Shape=function(a,d){this.engine=d;for(var c in a){this[c]=a[c]}};bHive.Shape.prototype={shape:"square",style:"filled",x:0,y:0,width:0,height:0,radius:0,backgroundColor:"rgba(0, 0, 0, 1)",strokeColor:"rgba(0, 0, 0, 1)",strokeWeight:1,alpha:100,visible:true,close:true,draw:function(u,s){u=(typeof u==this.engine.undef)?0:u;s=(typeof s==this.engine.undef)?0:s;var x=this.engine.stage2d;var m=Math.PI*2;if(this.backgroundColor instanceof bHive.Gradient){if(this.backgroundColor.type=="linear"){var f=(this.shape=="circle")?this.radius*2:this.height;var p=(this.shape=="circle")?this.radius*2:this.width;var k=(this.backgroundColor.dir>360)?(this.backgroundColor.dir%360):this.backgroundColor.dir;var j=Math.PI/180;point1={x:this.x,y:this.y};point2={x:this.x,y:this.y+f};if(k==45||k==90||k==135||k==180||k==225||k==270){switch(k){case 45:point1.x=this.x;point1.y=this.y;point2.x=this.x+p;point2.y=this.y+f;break;case 90:point1.x=this.x;point1.y=this.y;point2.x=this.x+p;point2.y=this.y;break;case 135:point1.x=this.x;point1.y=this.y+f;point2.x=this.x+p;point2.y=this.y;break;case 180:point1.x=this.x;point1.y=this.y+f;point2.x=this.x;point2.y=this.y;break;case 225:point1.x=this.x+p;point1.y=this.y+f;point2.x=this.x;point2.y=this.y;break;case 270:point1.x=this.x+p;point1.y=this.y;point2.x=this.x;point2.y=this.y;break}}else{if(k>0){box_ang=(k%90);if(k<=90){source_x=(Math.tan(k*Math.PI/180))*f;source_y=p/(Math.tan(k*Math.PI/180));point1.x=this.x;point1.y=this.y;point2.x=(this.x+source_x>this.x+p)?this.x+p:this.x+source_x;point2.y=(this.x+source_x>this.x+p)?this.y+source_y:this.y+f}else{if(k>91&&k<=180){source_x=f/(Math.tan(box_ang*Math.PI/180));source_y=(Math.tan(box_ang*Math.PI/180))*p;point1.x=(this.y+source_y>this.y+f)?this.x+source_x:this.x;point1.y=(this.y+source_y>this.y+f)?this.y+f:this.y+source_y;point2.x=this.x+p;point2.y=this.y}else{if(k>180&&k<=270){source_x=(Math.tan(box_ang*Math.PI/180))*f;source_y=p/(Math.tan(box_ang*Math.PI/180));point1.x=(this.x+source_x>this.x+p)?this.x+p:this.x+source_x;point1.y=(this.x+source_x>this.x+p)?this.y+source_y:this.y+f;point2.x=this.x;point2.y=this.y}else{if(k>270&&k<=359){source_x=f/(Math.tan(box_ang*Math.PI/180));source_y=(Math.tan(box_ang*Math.PI/180))*p;point1.x=this.x+p;point1.y=this.y;point2.x=(this.y+source_y>this.y+f)?this.x+source_x:this.x;point2.y=(this.y+source_y>this.y+f)?this.y+f:this.y+source_y}}}}}}bgColor=this.engine.stage2d.createLinearGradient(point1.x,point1.y,point2.x,point2.y)}else{var f=(this.shape=="circle")?this.radius*2:this.height;var p=(this.shape=="circle")?this.radius*2:this.width;var a=(this.shape=="circle")?this.radius:this.width;bgColor=this.engine.stage2d.createRadialGradient(this.x+(p/2),this.y+(f/2),0,this.x+(p/2),this.y+(f/2),a)}for(var e=0,c=this.backgroundColor.colors.length;e<c;e++){bgColor.addColorStop(this.backgroundColor.stops[e],this.backgroundColor.colors[e])}}else{if(this.backgroundColor.indexOf("#")!=-1){bgColor=this.engine.hex2RGBa(this.backgroundColor,this.alpha)}else{bgColor=this.backgroundColor}}x.save();switch(this.shape){case"square":if(this.style=="filled"){x.fillStyle=bgColor;x.fillRect(u+this.x,s+this.y,this.width,this.height)}else{x.lineWidth=1;x.strokeStyle=bgColor;x.strokeRect(u+this.x,s+this.y,this.width,this.height)}break;case"circle":var n=u+this.x+this.radius;var l=s+this.y+this.radius;if(this.style=="filled"){x.beginPath();x.fillStyle=bgColor;x.arc(n,l,this.radius,0,m,true);x.fill()}else{x.beginPath();x.strokeStyle=bgColor;x.arc(n,l,this.radius,0,m,true);x.stroke()}break;case"poly":x.beginPath();var y=this.points;var d=y.length;var r=0;var q=0;if(d>1){x.moveTo(u+this.x+y[0].x,s+this.y+y[0].y);for(e=1;e<d;e++){r=Math.max(r,y[e].x);q=Math.max(q,y[e].y);x.lineTo(u+this.x+y[e].x,s+this.y+y[e].y)}this.width=r;this.height=q}if(this.style=="filled"){x.fillStyle=bgColor;x.fill()}else{if(this.close){x.closePath()}x.strokeStyle=bgColor;x.stroke()}break;case"elipse":x.beginPath();x.moveTo((u+this.x)+(this.width/2),s+this.y);x.bezierCurveTo(((u+this.x)+(this.width/2))+this.width/2,((s+this.y)+(this.height/2))-this.height/2,((u+this.x)+(this.width/2))+this.width/2,((s+this.y)+(this.height/2))+this.height/2,((u+this.x)+(this.width/2)),((s+this.y)+(this.height/2))+this.height/2);x.bezierCurveTo(((u+this.x)+(this.width/2))-this.width/2,((s+this.y)+(this.height/2))+this.height/2,((u+this.x)+(this.width/2))-this.width/2,((s+this.y)+(this.height/2))-this.height/2,((u+this.x)+(this.width/2)),((s+this.y)+(this.height/2))-this.height/2);if(this.style=="filled"){x.fillStyle=bgColor;x.fill()}else{x.strokeStyle=bgColor;x.stroke()}break}x.restore()}};bHive.Sprite=function(a,e){var d=this;this.engine=e;this.events=[];for(var c in a){this[c]=a[c]}if(this.src instanceof bHive.Bitmap){this.image=this.src.image;this.framecount=this.framedata.length}else{this.image=new Image();this.image.src=this.src;this.image.onload=(function(f){return function(){if(typeof f.events.onload!=f.engine.undef){f.events.onload()}d.framecount=d.framedata.length}})(d)}};bHive.Sprite.prototype={src:"",width:0,height:0,buffer:null,framedata:null,events:null,image:null,alpha:100,rotation:0,visible:true,frame:0,framecount:0,framespeed:0,frametimer:0,registration_x:0,registration_y:0,x_scale:100,y_scale:100,playing:true,createBuffer:function(){this.buffer=document.createElement("canvas");this.buffer.width=this.width;this.buffer.height=this.height;document.getElementsByTagName("body")[0].appendChild(this.buffer)},addEventListener:function(c,a){this.events[c]=a},draw:function(l,k){l=(typeof l==this.engine.undef)?0:l;k=(typeof k==this.engine.undef)?0:k;if(typeof this.parent!=this.engine.undef){pA=this.parent.alpha;A=this.alpha;if(pA<100){newGA=pA;if(A<100){percentage=pA*(A/100);newGA=pA-percentage}this.engine.stage2d.globalAlpha=Math.abs(newGA)/100}else{if(A<100){this.engine.stage2d.globalAlpha=A/100}}}else{if(this.alpha<100){this.engine.stage2d.globalAlpha=this.alpha/100}}iW=this.framedata[this.frame].frame.w;iH=this.framedata[this.frame].frame.h;if(typeof this.parent!=this.engine.undef){if(this.x_scale!=100){iW=iW*(this.x_scale/100)}if(this.parent.x_scale!=100){iW=iW*(this.parent.x_scale/100)}}else{if(this.x_scale!=100){iW=iW*(this.x_scale/100)}}if(typeof this.parent!=this.engine.undef){if(this.y_scale!=100){iH=iH*(this.y_scale/100)}if(this.parent.y_scale!=100){iH=iH*(this.parent.y_scale/100)}}else{if(this.y_scale!=100){iH=iH*(this.y_scale/100)}}var i=this.framedata[this.frame].frame.x;var f=this.framedata[this.frame].frame.y;var a=this.framedata[this.frame].frame.w;var d=this.framedata[this.frame].frame.h;var n=this.x;var m=this.y;var e=iW;var c=iH;if(this.rotation!=0){this.engine.stage2d.save();var j=l+this.x;var h=k+this.y;if(this.rotation>360){this.rotation=0}this.engine.stage2d.translate(j,h);this.engine.stage2d.rotate(this.rotation*this.engine._radians);this.engine.stage2d.drawImage(this.image,i,f,a,d,this.registration_x*-1,this.registration_y*-1,e,c);this.engine.stage2d.restore()}else{this.engine.stage2d.drawImage(this.image,i,f,a,d,n,m,e,c)}if(this.playing){this.nextTimedFrame()}if(this.alpha<100){this.engine.stage2d.globalAlpha=this.engine.defGA}},nextTimedFrame:function(){if(this.frametimer==0){this.frame++;if(this.frame>this.framecount-1){this.frame=0}this.frametimer=this.framespeed}else{if(this.frametimer>0){this.frametimer--}}},nextFrame:function(){this.frame++;if(this.frame>this.framecount-1){this.frame=0}},gotoFrame:function(a){this.frame=(a>this.framecount-1||a<0)?0:a},stop:function(){this.playing=false},play:function(){this.playing=true},setFrameSpeed:function(a){this.framespeed=(a>0)?a:1},getFrameSpeed:function(){return(this.framespeed)},};bHive.Gradient=function(a,d){this.engine=d;this.colors=[];this.stops=[];for(var c in a){this[c]=a[c]}};bHive.Gradient.prototype={engine:null,dir:0,colors:null,stops:null};bHive.Sound=function(a,d){this.engine=d;this.events=[];for(var c in a){this[c]=a[c]}this.createDOMObject()};bHive.Sound.prototype={path:"",src:"",events:null,engine:null,formats:["mp3","ogg","wav"],duration:0,currentTime:0,ended:false,muted:false,paused:false,format:"",looping:true,autoplay:false,controls:false,addEventListener:function(c,a){this.events[c]=a},deleteEventListener:function(a){if(typeof this.events[a]!=this.engine.undef){delete this.events[a];console.log("deleted")}},createDOMObject:function(){this.domAudio=document.createElement("audio");this.domAudio.controls=this.controls;this.domAudio.autoplay=this.autoplay;this.domAudio.style.display="none";var a=this;this.format=this.supportedFormat();if(this.format!=""){this.domAudio.setAttribute("src",this.path+"/"+this.src+"."+this.format);if(this.looping){this.domAudio.setAttribute("loop","loop")}this.engine.bind(this.domAudio,"ended",function(c){return function(d){if(typeof c.events.onended!=c.engine.undef){c.events.onended()}if(c.looping){c.play()}}}(a),true);this.engine.bind(this.domAudio,"canplay",function(c){return function(){if(typeof c.events.oncanplay!=c.engine.undef){c.events.oncanplay({obj:c,event:"canplay"})}}}(a),true);this.engine.bind(this.domAudio,"canplaythrough",function(c){return function(){if(typeof c.events.canplaythrough!=c.engine.undef){c.events.oncanplaythough({obj:c,event:"canplaythrough"})}}}(a),true);document.getElementsByTagName("body")[0].appendChild(this.domAudio)}else{return false}},getDuration:function(){return this.domAudio.duration},getCurrentTime:function(){return this.domAudio.currentTime},setCurrentTime:function(d){var a=this.getDuration();var c=d;if(c>a||c<0){return false}else{this.domAudio.currentTime=c}},getVolume:function(){return this.domAudio.volume},setVolume:function(a){v=a/100;this.domAudio.volume=v},pause:function(){if(!this.domAudio.paused){this.domAudio.pause();return true}else{return false}},play:function(){if(this.domAudio.paused){this.domAudio.play();return true}else{return false}},stop:function(){this.domAudio.currentTime=0;if(this.pause()){return true}else{return false}},supportedFormat:function(){var d="";for(var c=0,a=this.formats.length;c<a;c++){if(this.domAudio.canPlayType("audio/"+this.formats[c])=="probably"||this.domAudio.canPlayType("audio/"+this.formats[c])=="maybe"){d=this.formats[c];break}}return d},};