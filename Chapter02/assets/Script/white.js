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
        this.parentNode = this.node.parent
    },
    update (dt) {
        if(this.node.x==this.defaultLocation+100){
            this.parentNode.children[1].active = true
            return;
        }
        else{
            this.node.x += 1
        }
    },
});
