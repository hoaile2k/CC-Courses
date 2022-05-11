
cc.Class({
    extends: cc.Component,

    properties: {
        getBunny: cc.Component,
        _bunnyAction: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        let moveUp = cc.sequence(cc.moveBy(2,cc.v2(200,0)),cc.flipX(true))
        let moveBack = cc.sequence(cc.moveBy(2,cc.v2(-200,0)),cc.flipX(false))
        let moveBunny = cc.sequence(moveUp, moveBack)
        this._bunnyAction = this.getBunny.node.runAction(cc.repeatForever(moveBunny))
        this.getBunny.node.stopAction(this.bunnyAction)
    },

    update(dt) {

    },
});
