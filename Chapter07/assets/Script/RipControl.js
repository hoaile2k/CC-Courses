const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        gameOver: cc.Component,
        getBunny: cc.Component,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager()
        manager.enabled = true
        // manager.enabledDebugDraw = true
        // manager.enabledDrawBoundingBox = true
    },

    start () {
        
    },

    onCollisionEnter: function (other, self) {
        if(other.tag == 1){
            Emitter.instance.emit(emitName.collRock, this.gameOver)
        }
        if(other.tag == 2){
            Emitter.instance.emit(emitName.collissionBunny, this.gameOver)
        }
        if(other.tag == 3){
            Emitter.instance.emit(emitName.win, this.gameOver)
        }
        if(other.tag == 11){
            Emitter.instance.emit(emitName.limitLeft, this.gameOver)
        }
        if(other.tag == 12){
            Emitter.instance.emit(emitName.limitLeft, this.gameOver)
        }
        if(other.tag == 7){
            Emitter.instance.emit(emitName.collGround)
        }
    }    
    // update (dt) {},
});
