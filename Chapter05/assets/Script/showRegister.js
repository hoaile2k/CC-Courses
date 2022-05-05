cc.Class({
    extends: cc.Component,

    properties: {
        showRegister: {
            default: null,
            type: cc.Component
        },
        hideScrollView:{
            default:null,
            type: cc.Component
        }
    },

    // onLoad () {},
    backRegisterClick(){
        this.showRegister.node.active = true
        this.hideScrollView.node.active = false     
    },

    start () {
        
    },

    // update (dt) {},
});
