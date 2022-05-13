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
            // self.node.destroy()
            Emitter.instance.emit(emitName.killBunny,self)
        }
    }  ,
    // update (dt) {},
});
