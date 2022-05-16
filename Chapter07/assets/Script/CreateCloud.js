const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        cloudPrefab: cc.Prefab,
        spineBoy: cc.Component,
        thunderPar: cc.ParticleSystem,
        _canMove: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance = new Emitter()
        this.evtLose = this.showParticle.bind(this)
        Emitter.instance.registerOnce(emitName.loseParticle, this.evtLose)
    },

    start() {
        let cloud = cc.instantiate(this.cloudPrefab)
        cloud.parent = this.node   
        cloud.active = false     
        this.cloud = cloud
        cloud.y = 200
        Emitter.instance.emit(emitName.cloudMove, cloud)
    },

    showParticle(){
        this.thunderPar.node.x = this.spineBoy.node.x
        this.thunderPar.node.active = true
        
        cc.tween(this.spineBoy.node)
            .call(()=>{
                this.cloud.active = true
            })
            .delay(3)
            .to(1, { scale: 0, y: 200, opacity: 0})
            .call(()=>{
                this.thunderPar.node.active = false
            })
            .start()
        cc.tween(this.cloud)
            .delay(4)
            .to(1, { scale: 0, y: 600, opacity: 0})
            .start()
    },

    update (dt) {
        if(this._canMove == true){
            this._canMove = false
            cc.tween(this.cloud)
                .to(0.1, {x:this.spineBoy.node.x })
                .call(()=>{
                    this._canMove = true
                })
                .start()
        }
        
    },
});
