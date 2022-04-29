cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // onLoad () {},

    start () {
        this.defaultLocation = this.node.x
        this.parentNode = this.node.parent
        cc.log("Hello!!!")
        cc.log("Im Brownie")
        cc.log(this.node)
    },

    update (dt) {
        // console.log(dt)
        if(this.node.x==this.defaultLocation+100){
            this.parentNode.children[2].active = true
            return;
        }
        else{
            this.node.angle -= 7
            this.node.x += 1
        }
    },
});
