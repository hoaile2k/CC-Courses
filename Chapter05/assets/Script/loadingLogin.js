cc.Class({
    extends: cc.Component,

    properties: {
        getListUser:{
            default: null,
            type: cc.Component
        },
        getLoading:{
            default:null,
            type: cc.ProgressBar
        }
    },

    // onLoad () {},

    start () {
        this.getLoading.progress = 0
    },

    update (dt) {
        this.getLoading.progress += dt*0.7
    },
});
