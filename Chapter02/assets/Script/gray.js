
cc.Class({
    extends: cc.Component,

    properties: {
       _defaultLocationY: 0,
    },

    // onLoad () {},

    start () {
        this._defaultLocationY = this.node.y
        this.jump = 0
        this.count = 0
        this.tempCount = 0
        this.parentNode = this.node.parent
        cc.log("Hmmm!!!")
    },

    update (dt) {
        if(this.count<3){
            if(this.node.y < this._defaultLocationY+50&&this.jump < 50){
                this.node.y += 1
                this.jump += 1
            }
            if(this.jump == 50 && this.node.y != this._defaultLocationY){
                this.node.y -= 1
                if(this.node.y == this._defaultLocationY){
                    this.jump = 0
                    this.count ++
                }
            }
        }
        else{
            this.parentNode.children[3].active = true
            return
        }       
    },

});
