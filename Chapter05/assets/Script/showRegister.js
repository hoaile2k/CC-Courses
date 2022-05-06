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
        },
        resetLoading:{
            default:null,
            type: cc.ProgressBar
        },
    },

    // onLoad () {},
    backRegisterClick(){
        this.showRegister.node.active = true
        this.hideScrollView.node.active = false  
        this.resetLoading.progress = 0   
    },

    start () {
        
    },

    // update (dt) {},
});
