cc.Class({
    extends: cc.Component,

    properties: {
        getBrownBunny:{
            default: null,
            type: cc.Component
        },
    },

    // onLoad () {},

    start () {
        this.defaultLocation = this.node.x
        cc.log("Hello")
        this.parentNode = this.node.parent
    },
    update (dt) {
        if(this.node.x==this.defaultLocation+100){
            this.getBrownBunny.node.active = true
            return;
        }
        else{
            this.node.x += 1
        }
    },
});
