window.__require=function e(t,n,i){function a(o,c){if(!n[o]){if(!t[o]){var r=o.split("/");if(r=r[r.length-1],!t[r]){var u="function"==typeof __require&&__require;if(!c&&u)return u(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+o+"'")}}var p=n[o]={exports:{}};t[o][0].call(p.exports,function(e){return a(t[o][1][e]||e)},p,p.exports,e,t,n,i)}return n[o].exports}for(var s="function"==typeof __require&&__require,o=0;o<i.length;o++)a(i[o]);return a}({AudioManager:[function(e,t,n){"use strict";cc._RF.push(t,"cec5d0P/f5ImJlat1aYa5vf","AudioManager");e("GameConfig");var i=e("EventManager");cc.Class({extends:cc.Component,properties:{musicAudioSource:cc.AudioSource,audioSourceSample:cc.AudioSource,totalAS:8,audioClips:[cc.AudioClip]},onLoad:function(){var e=this;i.on("PlaySFX",this.playSFX.bind(this)),i.on("GameStart",function(){e.musicAudioSource.volume=0,e.musicAudioSource.play(),cc.tween(e.musicAudioSource).to(1,{volume:.5}).start()}),i.on("GameEnd",function(){cc.tween(e.musicAudioSource).to(1,{volume:0}).call(function(){e.musicAudioSource.stop()}).start()}),i.on("GameResting",function(){cc.tween(e.musicAudioSource).to(1,{volume:.1}).start()}),i.on("GameRested",function(){cc.tween(e.musicAudioSource).to(1,{volume:.5}).start()}),this.audioSourcePool=[];for(var t=0;t<this.totalAS;t++){var n=cc.instantiate(this.audioSourceSample);this.audioSourcePool.push(n)}this.audioMapping=["UISelect","CarPlus","CarMinus","CarDead"]},playSFX:function(e){var t=this.audioMapping.indexOf(e);if(t>-1){var n=this.audioClips[t],i=this.audioSourcePool.find(function(e){return!e.isPlaying});i.clip=n,i.play()}else cc.error("Can't find "+e)}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig"}],EventManager:[function(e,t,n){"use strict";cc._RF.push(t,"1fe0dk2IFlPFpGsS+zAyXck","EventManager");var i=function(){function e(){this.eventTarget=new cc.EventTarget}var t;return{getInstance:function(){return null==t&&((t=new e).constructor=null),t}}}();t.exports=i.getInstance().eventTarget,cc._RF.pop()},{}],GameConfig:[function(e,t,n){"use strict";cc._RF.push(t,"b51b7H9W5VCmLNZu70upDfj","GameConfig"),t.exports={Camera:{OffsetYWithCar:100},Car:{Speed:160},Map:{Time:90,LeftPos:-52,RightPos:52},Obstacle:{},RestingTime:10},cc._RF.pop()},{}],GameManager:[function(e,t,n){"use strict";cc._RF.push(t,"4ef99b1nQVH35TMx0c1/D2r","GameManager");var i=e("GameConfig"),a=e("EventManager");cc.Class({extends:cc.Component,properties:{uiMgr:e("UIManager"),obstacleMgr:e("ObstacleSpawner"),mainCar:e("MainCar")},onLoad:function(){cc.director.getCollisionManager().enabled=!0,cc.game.setFrameRate(60),a.on("UpdateScore",this.onUpdateScore.bind(this)),a.on("GameStart",this.onGameStart.bind(this)),a.on("GameEnd",this.onGameEnd.bind(this)),this.timer=0,this.isRested=!0},onUpdateScore:function(e){this.userScore+=e.score,this.obstacleCounter[e.scoreReason]++,a.emit("ShowScore",this.userScore)},onGameStart:function(){this.resetScore(),this.mainCar.reset(),this.timer=0,this.isRested=!1,this.uiMgr.showHUD(!0),a.emit("ShowScore",0)},onGameEnd:function(e){var t=this;cc.log("End game reason : "+e),this.isRested=!0;var n={};n.reason=e,n.reportItems=[],n.userScore=this.userScore;var i=cc.sys.localStorage.getItem("BestScore");(isNaN(i)||this.userScore>i)&&(cc.sys.localStorage.setItem("BestScore",this.userScore),i=this.userScore),n.bestScore=i,Object.keys(this.obstacleMgr.reportableList).forEach(function(e){var i=t.obstacleMgr.reportableList[e],a=i.spriteFrame,s=t.obstacleCounter[i.name];n.reportItems.push({spriteFrame:a,total:s,name:e})}),this.uiMgr.showMenuResult(n),this.uiMgr.showHUD(!1)},resetScore:function(){var e=this;this.userScore=0,this.obstacleCounter=[],this.obstacleMgr.obstacleList.forEach(function(t){e.obstacleCounter[t.name]=0})},update:function(e){this.isRested||(this.timer+=e,this.timer>i.Map.Time/2&&(this.uiMgr.showMenuRest(),this.isRested=!0))}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig",MainCar:"MainCar",ObstacleSpawner:"ObstacleSpawner",UIManager:"UIManager"}],Hud:[function(e,t,n){"use strict";cc._RF.push(t,"1c24cFl4RtEorkNvleGxS5s","Hud");e("GameConfig");var i=e("EventManager"),a=e("Ultility");cc.Class({extends:cc.Component,properties:{scoreText:cc.Label,gameTimeText:cc.Label},onLoad:function(){this.time=0,i.on("GameStart",this.onPlayGame.bind(this)),i.on("ShowScore",this.showScore.bind(this))},onPlayGame:function(){this.time=0,this.scoreText.string=0},showScore:function(e){this.scoreText.string=e},update:function(e){this.time+=e,this.gameTimeText.string=a.getFancyTime(this.time.toFixed(0))}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig",Ultility:"Ultility"}],Localization:[function(e,t,n){"use strict";cc._RF.push(t,"aa9f2Q8dURJnKqf0neyTlHM","Localization"),t.exports={PLAY:"Ch\u01a1i"},cc._RF.pop()},{}],MainCamera:[function(e,t,n){"use strict";cc._RF.push(t,"fbc4eqaAMlP/Z6xKS+0+Edc","MainCamera");var i=e("GameConfig");cc.Class({extends:cc.Component,properties:{followObject:cc.Node},lateUpdate:function(e){this.node.y=this.followObject.y+i.Camera.OffsetYWithCar}}),cc._RF.pop()},{GameConfig:"GameConfig"}],MainCar:[function(e,t,n){"use strict";var i;cc._RF.push(t,"f5ccfr+4t1JRpNwE0XkDnqH","MainCar");var a=function e(t,n,i){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);if(void 0===a){var s=Object.getPrototypeOf(t);return null===s?void 0:e(s,n,i)}if("value"in a)return a.value;var o=a.get;return void 0!==o?o.call(i):void 0},s=e("GameConfig"),o=e("EventManager"),c="Run",r="Stand";cc.Class(i={extends:cc.Component,properties:{carDisplay:cc.Sprite,carNormalFrame:cc.SpriteFrame,carCrashFrame:cc.SpriteFrame},onLoad:function(){var e=this;cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.speed=s.Car.Speed,this.state=r,this.endRoadY=this.speed*s.Map.Time,o.on("GameStart",function(){e.node.y=0,e.node.x=0,e.node.angle=0,e.state=c,e.carDisplay.spriteFrame=e.carNormalFrame}),o.on("GameResting",function(){e.state=r}),o.on("GameRested",function(){e.state=c}),this.isTurning=!1},reset:function(){this.isTurning=!1},onDestroy:function(){a(i.__proto__||Object.getPrototypeOf(i),"onDestroy",this).call(this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onKeyDown:function(e){},onKeyUp:function(e){switch(e.keyCode){case cc.macro.KEY.left:this.carTurn("left");break;case cc.macro.KEY.right:this.carTurn("right")}},update:function(e){if(this.state==c&&(this.node.y+=e*this.speed,this.node.y>this.endRoadY)){this.state=r;var t={position:cc.v2(this.node.x,this.node.y+50),easing:"sineOutIn"},n=cc.tween(this.node).to(2,t);n.call(function(){o.emit("GameEnd","FinishRoad")}),n.start()}},carTurn:function(e){var t=this;if(this.state==c&&!this.isTurning){var n="left"==e;if(0==this.node.x||this.node.x>0&&n||this.node.x<0&&!n){var i=n?s.Map.LeftPos:s.Map.RightPos,a=n?-30:30,o={position:cc.v2(i,.25*this.speed),angle:-a};this.carTurnTween=cc.tween(this.node).by(.25,o).to(.1,{angle:0}).call(function(){t.isTurning=!1}),this.carTurnTween.start(),this.isTurning=!0}}},dead:function(){cc.log("DEAD"),this.state=r,this.carDisplay.spriteFrame=this.carCrashFrame,this.carTurnTween&&this.carTurnTween.stop(),this.scheduleOnce(function(){o.emit("GameEnd","Destroy")},1)},onCollisionEnter:function(e,t){}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig"}],MapScroller:[function(e,t,n){"use strict";cc._RF.push(t,"03014lycDFO3r+tCBA636Ir","MapScroller");var i=e("GameConfig"),a=e("EventManager");cc.Class({extends:cc.Component,properties:{mapPieces:[cc.Node],mainCar:cc.Node},onLoad:function(){this.lastYpos=i.Map.Time*i.Car.Speed,this.initMapPiecePos=[];for(var e=0;e<this.mapPieces.length;e++)this.initMapPiecePos.push(this.mapPieces[e].position);a.on("GameStart",this.reset.bind(this))},lateUpdate:function(e){for(var t=0;t<this.mapPieces.length;t++){var n=this.mapPieces[t];n.y<this.mainCar.y-256&&n.y<this.lastYpos&&(n.y=this._lastNodePosY+256,this._lastNodePosY=n.y)}},reset:function(){for(var e=0;e<this.mapPieces.length;e++)this.mapPieces[e].position=this.initMapPiecePos[e];this._lastNodePosY=this.mapPieces[2].y}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig"}],MenuMain:[function(e,t,n){"use strict";cc._RF.push(t,"4dabdpL5F5C8pwTQjIJPjrH","MenuMain");var i=e("EventManager");cc.Class({extends:cc.Component,properties:{},OnPlay:function(){this.node.active=!1,i.emit("PlaySFX","UISelect"),i.emit("GameStart")}}),cc._RF.pop()},{EventManager:"EventManager"}],MenuRest:[function(e,t,n){"use strict";cc._RF.push(t,"5b65711pSdPs4nsI3jQTiDe","MenuRest");var i=e("GameConfig"),a=e("EventManager");cc.Class({extends:cc.Component,properties:{timerSprite:cc.Sprite},onLoad:function(){this.restingTime=i.RestingTime,this.timer=0},show:function(){this.timer=0,a.emit("GameResting"),this.node.active=!0},update:function(e){this.timer+=e,this.timerSprite.fillStart=this.timer/this.restingTime,this.timer>this.restingTime&&(this.node.active=!1,a.emit("GameRested"))}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig"}],MenuResultReportItem:[function(e,t,n){"use strict";cc._RF.push(t,"25171P8AJpJRJgI90cDmHe3","MenuResultReportItem"),cc.Class({extends:cc.Component,properties:{sprite:cc.Sprite,counterText:cc.Label},setup:function(e){this.sprite.spriteFrame=e.spriteFrame,this.counterText.string=e.total}}),cc._RF.pop()},{}],MenuResult:[function(e,t,n){"use strict";cc._RF.push(t,"956bdx11KVAZbbDd4+Ecaln","MenuResult");var i=e("GameConfig"),a=e("EventManager"),s=e("Ultility");cc.Class({extends:cc.Component,properties:{playTimeText:cc.Label,bestScoreText:cc.Label,userScoreText:cc.Label,reportPrefab:cc.Node},onLoad:function(){this.reportPrefab.active=!1},OnRestart:function(){this.node.active=!1,a.emit("GameStart")},setup:function(t){var n=this,a=this.reportPrefab.parent;this.reportPrefab.active=!1,a.children.forEach(function(e){e.active&&e.destroy()}),t.reportItems.forEach(function(t){var i=cc.instantiate(n.reportPrefab).getComponent(e("MenuResultReportItem"));i.node.parent=a,i.setup(t),i.node.active=!0,i.node.name=t.name}),this.userScoreText.string="Current Score: "+t.userScore,this.bestScoreText.string="Best Score: "+t.bestScore,this.playTimeText.string="Play time: "+s.getFancyTime(i.Map.Time+i.RestingTime)}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig",MenuResultReportItem:"MenuResultReportItem",Ultility:"Ultility"}],ObstacleSpawner:[function(e,t,n){"use strict";cc._RF.push(t,"f38b6PZ0ctOk4FklBaQSNkD","ObstacleSpawner");var i=e("GameConfig"),a=e("EventManager");cc.Class({extends:cc.Component,properties:{mainCar:e("MainCar"),obstacleList:[cc.Prefab]},onLoad:function(){var e=this;this._timeToSpawn=1.5,this._timer=0,this.allowSpawn=!1,this.obOnMap=[],a.on("GameStart",this.onGameStart.bind(this)),a.on("GameEnd",this.onGameEnd.bind(this)),this.reportableList={},this.obstacleList.forEach(function(t){var n=cc.find("Display",t.data).getComponent(cc.Sprite).spriteFrame;t.data.getComponent("Obstacle").deadObstalce||(e.reportableList[t.name]={spriteFrame:n,name:t.name})}),this.allowSpawn=!1,a.on("GameResting",function(){e.allowSpawn=!1}),a.on("GameRested",function(){e.allowSpawn=!0})},onGameEnd:function(){var e=this;this.allowSpawn=!1,this.obOnMap.forEach(function(t){t.y<e.mainCar.node.y&&t.destroy()})},onGameStart:function(){this.obOnMap.forEach(function(e){e.destroy()}),this.obOnMap=[],this.allowSpawn=!0},lateUpdate:function(e){this.allowSpawn&&(this._timer+=e,this._timer>this._timeToSpawn&&(this._timer=0,this.spawnObstacle()),this.checkObstacles())},spawnObstacle:function(){var e=this,t=Math.floor(2.9*Math.random()),n=[0,i.Map.LeftPos,i.Map.RightPos];n.splice(t,1),n.forEach(function(t){var n=Math.floor(Math.random()*e.obstacleList.length),i=e.obstacleList[n],a=cc.instantiate(i);a.parent=e.node;var s=cc.v2(0,e.mainCar.node.position.y+300+100*Math.random());s.x=t,a.position=s,a.needDestroy=!1,e.obOnMap.push(a)})},checkObstacles:function(){this.obOnMap.length<1||(this.obOnMap=this.obOnMap.filter(function(e,t,n){return!e.needDestroy||(e.destroy(),!1)}),this.obOnMap[0].y<this.mainCar.y-150&&this.obOnMap.shift().destroy())}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig",MainCar:"MainCar"}],Obstacle:[function(e,t,n){"use strict";cc._RF.push(t,"99f6bzpV4xJdLS/RuTS6DzP","Obstacle");e("GameConfig");var i=e("EventManager");cc.Class({extends:cc.Component,properties:{display:cc.Node,scoreFX:cc.Prefab,scoreEarn:500,speed:50,deadObstalce:!1},onLoad:function(){var e=this;this.isGameRest=!1,i.on("GameResting",function(){e.isGameRest=!0}),i.on("GameRested",function(){e.isGameRest=!1})},update:function(e){this.isGameRest||this.display.active&&(this.node.y+=e*this.speed)},onCollisionEnter:function(e,t){var n=this;if(99==e.tag){if(this.deadObstalce)return e.getComponent("MainCar").dead(),void i.emit("PlaySFX","CarDead");this.display.active=!1,i.emit("UpdateScore",{score:this.scoreEarn,scoreReason:this.node.name});var a=cc.instantiate(this.scoreFX);a.parent=this.node,a.getComponent(cc.Label).string=(this.scoreEarn>0?"+":"")+this.scoreEarn,a.color=this.scoreEarn>0?cc.Color.WHITE:cc.Color.RED,cc.tween(a).by(.5,{position:cc.v2(0,100),opacity:10}).call(function(){n.node.needDestroy=!0}).start();var s=this.scoreEarn>0?"CarPlus":"CarMinus";i.emit("PlaySFX",s)}else 0==this.speed&&(this.display.active=!1,this.node.needDestroy=!0)}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig"}],TouchInput:[function(e,t,n){"use strict";cc._RF.push(t,"b578e/cf1NHE4sgN7R8TT6n","TouchInput"),cc.Class({extends:cc.Component,properties:{car:e("MainCar")},onLoad:function(){this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this,!0)},onTouchEnd:function(e){var t=e.currentTouch.getLocationInView(),n=e.currentTouch.getStartLocationInView(),i=t.sub(n);i.x>50?this.car.carTurn("right"):i.x<-50&&this.car.carTurn("left")}}),cc._RF.pop()},{MainCar:"MainCar"}],UIManager:[function(e,t,n){"use strict";cc._RF.push(t,"808170imP1PFZaW3GKHGGkK","UIManager");e("GameConfig"),e("EventManager");cc.Class({extends:cc.Component,properties:{menuMain:e("MenuMain"),menuResult:e("MenuResult"),menuRest:e("MenuRest"),hud:cc.Node},onLoad:function(){},showMenuResult:function(e){this.hud.active=!1,this.menuResult.setup(e),this.menuResult.node.active=!0},showMenuRest:function(){this.menuRest.show()},showHUD:function(e){this.hud.active=e}}),cc._RF.pop()},{EventManager:"EventManager",GameConfig:"GameConfig",MenuMain:"MenuMain",MenuRest:"MenuRest",MenuResult:"MenuResult"}],Ultility:[function(e,t,n){"use strict";cc._RF.push(t,"7f62fLWvj1L6JzRi+1RmxBD","Ultility"),t.exports={getFancyTime:function(e){var t=Math.floor(e/60),n=e-60*t;return t.toString().padStart(2,"0")+":"+n.toString().padStart(2,"0")}},cc._RF.pop()},{}]},{},["AudioManager","EventManager","GameConfig","GameManager","Hud","Localization","MainCamera","MainCar","MapScroller","MenuMain","MenuRest","MenuResult","MenuResultReportItem","Obstacle","ObstacleSpawner","TouchInput","UIManager","Ultility"]);