cc.Class({
    extends: cc.Component,

    properties: {
        getGrayBunny:{
            default: null,
            type: cc.Component
        }
    },

    // onLoad () {},

    start () {
        this.defaultLocation = this.node.x
        cc.log("Hello!!!")
        cc.log("Im Brownie")
    },

    update (dt) {
        if(this.node.x==this.defaultLocation+100){
            this.getGrayBunny.node.active = true
            return;
        }
        else{
            this.node.angle -= 7
            this.node.x += 1
        }
    },
});
