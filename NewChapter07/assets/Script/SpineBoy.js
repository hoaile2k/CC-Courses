const Emitter = require("mEmitter")

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        _canRunning: true,
        _canJump: true,
        _setIdle: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance = new Emitter()
    },


    start() {
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    },
    onCollisionStay: function (other, self) {
        if (other.tag == 1) {
            this.colliderGround()
        }
    },
    colliderGround: function () {
        if (!this._setIdle) {
            this.spineBoy.addAnimation(0, "run", true,1)
            this._setIdle = true
        }
    },

    onKeyUp: function (event) {
        this.actionKeyCodeUp(event.keyCode)
    },
    onKeyDown: function (event) {
        this.actionKeyCodeDown(event.keyCode)
    },

    actionKeyCodeDown: function (keycode) {
        switch (keycode) {
            case cc.macro.KEY.left:
            this.spineMoveLeftDown()
                break;

            case cc.macro.KEY.right:
                this.spineMoveRightDown()
                break;

            case cc.macro.KEY.up:
                this.spineJumpDown()
                break;
        }
    },
    spineMoveRightDown: function () {
        if(this._canRunning){
            this._canRunning = false
            this.spineBoy.setAnimation(0, "walk", true,0)
            this.runTo = "right"
            this.moveRightTween = 
                cc.tween(this.spineBoy.node)
                    .to(0,{scaleX: 0.2})
                    .by(15,{x:1500})
                    .call(()=>{
                        
                    })
                    .start()
        }
    },
    spineMoveLeftDown: function () {
        if(this._canRunning){
            cc.log(this._canRunning)
            this._canRunning = false
            this.runTo = "left"
            this.spineBoy.setAnimation(0, "walk", true)
            this.moveLeftTween = 
                cc.tween(this.spineBoy.node)
                    .to(0,{scaleX: -0.2})
                    .by(15,{x:-1500})
                    .call(()=>{
                        
                    })
                    .start()
        }
    },
    spineJumpDown: function () {
        // if(this._canJump){
        //     this._canJump = false
        //     this.spineBoy.setAnimation(0, "jump", false)
            
        // }
    },

    actionKeyCodeUp: function (keycode) {
        switch (keycode) {
            case cc.macro.KEY.left:
                this.spineMoveLeftUp()
                break;

            case cc.macro.KEY.right:
                this.spineMoveRightUp()
                break;

            case cc.macro.KEY.up:
                this.spineJumpUp()
                break;
        }
    },
    spineMoveRightUp: function () {
        cc.log(this.moveRightTween)
        if(this.runTo == "right"){
            this.moveRightTween.stop()
            this.spineBoy.setAnimation(0, "idle", true)
            this._canRunning = true
        }
    },
    spineMoveLeftUp: function () {
        cc.log(this.runTo)
        if(this.runTo == "left"){
            cc.log(this.moveLeftTween)
            this.moveLeftTween.stop()
            // this.spineBoy.setAnimation(0, "idle", true)
            this._canRunning = true
        }
    },
    spineJumpUp: function () {
        // this.spineBoy.setAnimation(0, "jump", false)
        if(this._canJump){
            this._canJump = false
            this._canRunning = false
            this.spineBoy.setAnimation(0, "jump", false)
            if(!this._canJump){
                this.spineBoy.setCompleteListener(() => {
                    if(!this._canRunning){
                        this.spineBoy.setAnimation(0, "walk", true)
                    }
                    this._canJump = true
                    this._canRunning = true
                })
            }
            
        }
    },
    update (dt) {
        let findBone = this.spineBoy.findBone("torso")
        this.node.getComponent(cc.BoxCollider).offset= cc.v2(findBone.worldX ,  findBone.worldY+100 );
    },
});
