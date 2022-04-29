cc.Class({
    extends: cc.Component,

    properties: {
        _scaleBlack : 3,
        _defaultX: 0,
    },

    // onLoad () {},

    start () {
        cc.log("Hello")
        this._defaultX = this.node.x
        this._defaultY = this.node.y
        let actionMove= [cc.scaleTo(1,3),cc.moveBy(2, cc.v2({x:100,y:0})),cc.flipX(true), cc.moveBy(2, cc.v2({x: -100, y:0}))]
        this.moveTo = this.node.x
        // this.node.runAction(cc.scaleTo(1, 3),)
        this.node.runAction(cc.sequence(actionMove))
        // this.node.runAction(cc.delayTime(2))
        // this.node.runAction(cc.sequence(cc.delayTime(2),cc.moveBy(2, cc.v2({x: -100, y:0}))))

        // this.node.runAction(cc.delayTime(2),cc.moveBy(2, cc.v2({x: -100, y:0})))
    },

    update (dt) {
    
            // if(this.moveTo < this._defaultX + 100){
            //     this.node.x ++
            //     this.moveTo ++
            //     if(this.node.x == this._defaultX + 100){
            //         this.moveBack = this._defaultX + 100
            //     }
            // }
            // if(this.moveBack > this._defaultX){
            //     this.moveBack --;
            //     this.node.x --;
            // }
            // else{
            //     return
            // }
       
    },
});
