const Emitter = require("mEmitter")
const emitName = require("emitName")
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // onLoad () {},

    start () {

    },
    onCollisionEnter: function (other, self) {
        if(other.tag == 2){
            Emitter.instance.emit(emitName.killBunny,other)
        }
    }  
    // update (dt) {},
});