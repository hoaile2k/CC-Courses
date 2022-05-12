const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        carrotPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.eventCallMomBummy = this.carrotAttack.bind(this)
        Emitter.instance.registerEvent(emitName.callMomBummy, this.eventCallMomBummy)
    },

    carrotAttack: function () {
        this.instantCarrot()
        this.schedule(function () {
            this.instantCarrot()
        }, 2)
    },
    instantCarrot: function (){
        if(this.node.opacity<255){
            return
        }
        let randomCarrot = [-150,-170,-140,-120,-100,50,70,100,0,20]
        let carrotPos = randomCarrot.sort(()=>{
            return 0.5 - Math.random()
        })
        let carrot = this.carrotPrefab
        let item = cc.instantiate(carrot);
        item.parent = this.node.parent;
        item.x = this.node.x - 100
        item.y = this.node.y + carrotPos[0]
        let moveCarrot = cc.sequence(cc.moveBy(15, cc.v2(-2000, carrotPos[2])), cc.delayTime(0.1))
        this.bulletAction = item.runAction(cc.sequence(moveCarrot, cc.callFunc(() => {
            item.destroy()
        })))
    }

    // update (dt) {},
});
