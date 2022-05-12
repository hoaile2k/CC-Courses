const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        getBunny: cc.Component,
        momBunny: cc.Component,
        bunnyTalk: cc.Label,
        _bunnyAction: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.eventKillBunny = this.killBunny.bind(this)
        this.eventKillMomBunny = this.killMomBunny.bind(this)

        Emitter.instance.registerOnce(emitName.killBunny, this.eventKillBunny)
        Emitter.instance.registerEvent(emitName.killMomBunny, this.eventKillMomBunny)
    },

    start() {
        let moveUp = cc.sequence(cc.moveBy(2, cc.v2(200, 0)), cc.flipX(true))
        let moveBack = cc.sequence(cc.moveBy(2, cc.v2(-200, 0)), cc.flipX(false))
        let moveBunny = cc.sequence(moveUp, moveBack)
        this._bunnyAction = this.getBunny.node.runAction(cc.repeatForever(moveBunny))


    },

    killBunny: function (data) {
        const bunny = {
            mom: this.momBunny,
            son: this.getBunny,
            sonTalk: this.bunnyTalk,
        }
        this.bunnyTalk.node.active = true
        this.node.stopAction(this._bunnyAction)
        this.bunnyTalk.node.runAction(cc.flipX(true))
        this.node.runAction(cc.flipX(true))
        this.bunnyTalk.node.runAction(cc.flipX(true))

        // this.node.runAction
        // this.node.runAction(cc.sequence(cc.flipY(true),cc.moveBy(0,cc.v2(0,-50))))
        // this.node.stopAction(this._bunnyAction)
        Emitter.instance.emit(emitName.eventCollisionBunny, bunny)
    },
    killMomBunny: function (data) {
        let hp = this.momBunny.node.getChildByName("hp").getComponent("cc.ProgressBar")
        hp.progress -= 0.1
        if (hp.progress <= 0) {
            // this.momBunny.node.angle = -90
            cc.tween(this.momBunny.node)
                .to(0.5, { angle: -90, y: -200 })
                .to(3, { opacity: 0 })
                .call(()=>{
                    this.momBunny.node.destroy()
                })
                .start()
        }
    },
    update(dt) {

    },
});
