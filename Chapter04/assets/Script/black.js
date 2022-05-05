cc.Class({
    extends: cc.Component,

    properties: {
        _defaultX: 0,
        _scaleTo: 3
    },

    // onLoad () {},

    start () {
        cc.log("Hello")
        this._defaultX = this.node.x
        this._defaultY = this.node.y
        this.moveTo = this.node.x
        //Use runActopn()
        // let actionMove= [cc.scaleTo(1,3),cc.moveBy(2, cc.v2({x:100,y:0})),cc.flipX(true), cc.moveBy(2, cc.v2({x: -100, y:0}))]
        // this.node.runAction(cc.sequence(actionMove))
    },

    update (dt) {
        //Code tay
        if(this.node.scaleY < this._scaleTo){
            this.node.scaleX += 0.05
            this.node.scaleY += 0.05
        }
        if(this.node.scale >= this._scaleTo){
            if(this.moveTo < this._defaultX + 100){
                this.node.x ++
                this.moveTo ++
                if(this.node.x == this._defaultX + 100){
                    this.moveBack = this._defaultX + 100
                    this.node.scaleX = -3
                }
            }
            
        }
        if(this.moveBack > this._defaultX){
            this.moveBack --;
            this.node.x --;
        }
        else{
            this.node.scaleX = 3
            return
        }
            
    },
});
