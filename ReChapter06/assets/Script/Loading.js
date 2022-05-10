const Emitter = require("mEmitter")
const EventName = require("EmitEventName")
cc.Class({
    extends: cc.Component,

    properties: {
        loading: cc.ProgressBar,
        getListUser: cc.Component,
        _isLoading: true
    },

    // onLoad () {},

    start() {
        let events = Emitter.instance.emit(EventName.btnBackRegis, this.getLoading)
    },
    loadingProgress() {
        if (this.loading.progress == 0) {
            cc.tween(this.loading)
                .to(1.5, { progress: 1 })
                .call(() => {
                    this.node.active = false
                    Emitter.instance.emit(EventName.loading, this.getListUser)
                    this.loading.progress = 0
                    this._isLoading = true
                })
                .start()
        }

    },

    update(dt) {
        if (this.node.active&&this._isLoading) {
            this.loadingProgress()
            this._isLoading = false
        }
    },
});
