const Emitter = require('mEmitter');
const EmitName = require('EmitName');
cc.Class({
    extends: cc.Component,

    properties: {
        getLoading: cc.ProgressBar,
        getListUser: cc.Component,
        _pauseUpdate: true
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    loading(dt) {
        this._pauseUpdate = false
        this.schedule(() => {
            this.getLoading.progress += 1/30
            if (this.getLoading.progress >= 1) {
                Emitter.instance = new Emitter();    
                this.getLoading.progress = 0
                this.getListUser.node.active = true
                this.node.active = false
                this._pauseUpdate = true
            }
        }, 0.05, 30);
    },

    update(dt) {
        if (this.node.active) {
            if (this._pauseUpdate)
                this.loading(dt)
        }
    },
});
