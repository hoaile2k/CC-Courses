const Emitter = require("mEmitter")
const emitName = require("emitName")
cc.Class({
    extends: cc.Component,
    properties: {
        getBunny: cc.Component,
        getSpineBoy: require("SpineBoyAnim"),
        _checkCollision: true
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance = new Emitter();
    },

    start () {

    },

    update (dt) {
        if(this._checkCollision == true){
            let bullet = this.getSpineBoy._listBullet
            let bunnyPos = this.getBunny.node.x
            bullet.forEach((element,index) => {
                let dataOfBullet = {
                    element: element,
                    index: index
                }
                let bulletPos = element.x
                if(bulletPos >= bunnyPos-80){
                    Emitter.instance.emit(emitName.killBunny,dataOfBullet)
                    this._checkCollision = false
                }
            });
        }
    },
});
