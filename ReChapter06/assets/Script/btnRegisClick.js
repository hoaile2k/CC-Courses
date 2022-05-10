const Emitter = require("mEmitter")
const EventName = require("EmitEventName")
cc.Class({
    extends: cc.Component,

    properties: {
        getLoading: cc.Component
    },

    // onLoad () {},

    start () {
        
    },

    btnRegisEvent(){
        this.node.active = false
        Emitter.instance.emit(EventName.btnRegisClick, this.getLoading)
    },
    // update (dt) {},  
});
