const Emitter = require("mEmitter")
const emitName = require("emitName")
cc.Class({
    extends: cc.Component,

    properties: {
        _countHeadshot: 0,
    },

    // onLoad () {},

    start () {

    },
    onCollisionEnter: function (other, self) {
        if(other.tag == 2){
            Emitter.instance.emit(emitName.killBunny,other)
        }
        if(other.tag == 4){
            Emitter.instance.emit(emitName.killMomBunny,this._countHeadshot)
        }
    }  
    // update (dt) {},
});
