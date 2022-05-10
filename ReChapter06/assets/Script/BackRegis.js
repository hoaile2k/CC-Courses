const Emitter = require("mEmitter")
const EventName = require("EmitEventName")
cc.Class({
    extends: cc.Component,

    properties: {
        getRegisScreen: cc.Component,
    },

    // onLoad () {},

    start () {
        
    },

    btnBackRegisEvent(){
        this.node.active = false
        Emitter.instance.emit(EventName.btnBackRegis, this.getRegisScreen)
    }
    // update (dt) {},  
});
