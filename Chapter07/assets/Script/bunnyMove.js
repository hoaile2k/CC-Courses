const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        getBunny: cc.Component,
        getBoom: cc.Component,
        _bunnyAction: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.eventKillBunny = this.killBunny.bind(this)
        Emitter.instance.registerOnce(emitName.killBunny, this.eventKillBunny)
    },

    start() {
        let moveUp = cc.sequence(cc.moveBy(2, cc.v2(200, 0)), cc.flipX(true))
        let moveBack = cc.sequence(cc.moveBy(2, cc.v2(-200, 0)), cc.flipX(false))
        let moveBunny = cc.sequence(moveUp, moveBack)
        this._bunnyAction = this.getBunny.node.runAction(cc.repeatForever(moveBunny))
    },

    killBunny: function (data) {
        const bunny = {
            son: this.getBunny,
        }
        cc.tween(this.getBoom.node)
            .to(0.5,{opacity: 255})
            .to(0.5,{opacity: 0})
            .start()

        cc.log(this.getBoom.node)
        this.node.stopAction(this._bunnyAction)
        Emitter.instance.emit(emitName.eventCollisionBunny, bunny)
    },

    update(dt) {

    },
});
