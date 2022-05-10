
cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        compSpine: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.spineBoy.setAnimation(0, "portal",false)        
        
        // this.node.on
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    
    onKeyUp: function (event) {
        this.actionForKeyCode(event.keyCode);
    },

    actionForKeyCode: function (keyCode) {
        if (this.isAnimation) {
            return;
        }

        var isMoved = false;
        switch (keyCode) {
            case cc.macro.KEY.up: {
                isMoved = this.moveUp();
                break;
            }
            case cc.macro.KEY.down: {
                isMoved = this.moveDown();
                break;
            }
            case cc.macro.KEY.left: {
                isMoved = this.moveLeft();
                break;
            }
            case cc.macro.KEY.right: {
                isMoved = this.moveRight();
                break;
            }
        }
    },
    moveUp: function () {
        let jumpBy = cc.jumpBy(0.5,10)
        this.spineBoy.node.runAction(jumpBy)
        this.spineBoy.addAnimation(0, "jump",false)  
    },

    moveDown: function () {
        
    },

    moveLeft: function () {
        
    },

    moveRight: function () {
        let moveBy = cc.moveBy(1,cc.v2(10,0))
        this.spineBoy.node.runAction(moveBy)
        this.spineBoy.addAnimation(0, "run",false)  
    },

    // update (dt) {},
});
