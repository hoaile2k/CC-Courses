cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.defaultLocation = this.node.x
        cc.log("Hello")
        // this.parentNode = this.node.parent 
        this.parentNode = this.node.parent.children
        cc.log(this.parentNode)
        cc.log(this.node)
    },
    update (dt) {
        if(this.node.x==this.defaultLocation+100){
            this.parentNode[1].active = true
            return;
        }
        else{
            this.node.x += 1
        }
    },
});
