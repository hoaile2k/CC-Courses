const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager()
        manager.enabled = true
        manager.enabledDebugDraw = true
        manager.enabledDrawBoundingBox = true
    },

    start () {
        
    },

    onCollisionEnter: function (other, self) {
        Emitter.instance.emit(emitName.collissionRip)
    }    
    // update (dt) {},
});
