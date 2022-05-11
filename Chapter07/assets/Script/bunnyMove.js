const Emitter = require("mEmitter")

cc.Class({
    extends: cc.Component,

    properties: {
        getBunny: cc.Component,
        _bunnyAction: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.eventKillBunny = this.killBunny.bind(this)
        Emitter.instance.registerOnce("killBunny",this.eventKillBunny)
    },

    start() {
        let moveUp = cc.sequence(cc.moveBy(2,cc.v2(200,0)),cc.flipX(true))
        let moveBack = cc.sequence(cc.moveBy(2,cc.v2(-200,0)),cc.flipX(false))
        let moveBunny = cc.sequence(moveUp, moveBack)
        this._bunnyAction = this.getBunny.node.runAction(cc.repeatForever(moveBunny))
    },

    killBunny: function (data){
        this.node.runAction(cc.sequence(cc.flipY(true),cc.moveBy(0,cc.v2(0,-50))))
        this.node.stopAction(this._bunnyAction)
        Emitter.instance.emit("eventCollisionBunny", data)
        Emitter.instance.removeEvent("killBunny", this.killBunny)
    },

    update(dt) {

    },
});
