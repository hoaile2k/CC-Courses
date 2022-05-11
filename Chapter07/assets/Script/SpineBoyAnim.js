const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        bulletPrefab: cc.Prefab,
        getBunny: cc.Node,
        boomSprite: cc.Sprite,
        _isAction: true,
        _listBullet: []
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.eventCollisionBunny = this.collisionBunny.bind(this)
        this.eventCollisionRip = this.collissionRip.bind(this)
        Emitter.instance.registerOnce(emitName.eventCollisionBunny,this.eventCollisionBunny)
        Emitter.instance.registerOnce(emitName.collissionRip, this.eventCollisionRip)
    },

    start() {
        this.spineBoy.setAnimation(0, "portal", false)
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
                this._isAction = false
                break;
            }
            case cc.macro.KEY.down: {
                isMoved = this.moveDown();
                break;
            }
            case cc.macro.KEY.left: {
                isMoved = this.moveLeft();
                this._isAction = false
                break;
            }
            case cc.macro.KEY.right: {
                isMoved = this.moveRight();
                this._isAction = false
                break;
            }
            case cc.macro.KEY.space: {
                isMoved = this.spaceShoot()
                break;
            }
        }
    },
    moveUp: function () {
        if (this._isAction) {
            this.spineBoy.setAnimation(0, "hoverboard", false)
            if (this.spineBoy.node.scaleX > 0) {
                cc.tween(this.spineBoy.node)
                    .by(0.5, { x: 150, y: 150 },{ easing: 'smooth'})
                    .by(0.5, { x: 150, y: -150 },{ easing: 'smooth'})
                    .call(() => {
                        // this.spineBoy.setAnimation(0, "idle", false)
                        this._isAction = true
                    })
                    .start()
            }
            else {
                cc.tween(this.spineBoy.node)
                .by(0.5, { x: -150, y: 150 })
                .by(0.5, { x: -150, y: -150 })
                .call(() => {
                    // this.spineBoy.setAnimation(0, "idle", false)
                    this._isAction = true
                })
                .start()
            }
        }
        

    },

    moveDown: function () {

    },

    moveLeft: function () {
        if (this._isAction) {
            this.spineBoy.setAnimation(0, "run", false)
            cc.tween(this.spineBoy.node)
                .to(0, { scaleX: -0.3 })
                .by(0.5, { x: -50 })
                .call(() => {
                    // this.spineBoy.setAnimation(0, "idle", false)
                    this._isAction = true
                })
                .start()
        }
    },

    moveRight: function () {
        if (this._isAction) {
            this.spineBoy.setAnimation(0, "run", false)
            cc.tween(this.spineBoy.node)
                .to(0, { scaleX: 0.3 })
                .by(0.5, { x: 50 })
                .call(() => {
                    // this.spineBoy.setAnimation(0, "idle", false)
                    this._isAction = true
                })
                .start()
        }

    },
    spaceShoot: function (){
        let bullet = this.bulletPrefab
        let item = cc.instantiate(bullet);
        if(this.spineBoy.node.scaleX > 0){
            item.parent = this.node.parent;
            item.x = this.spineBoy.node.x+50
            item.y = this.spineBoy.node.y+50
            let moveBullet = cc.sequence(cc.moveBy(2,cc.v2(1000,0)),cc.delayTime(0.1))
            this.bulletAction= item.runAction(cc.sequence(moveBullet, cc.callFunc(()=>{
                item.opacity = 0
            })))
            this._listBullet.push(item)
            // cc.log(item.parent)
            // cc.log("con thỏ", this.getBunny.node.parent)
        }
        else{
            item.parent = this.node.parent;
            item.x = this.spineBoy.node.x-150
            item.y = this.spineBoy.node.y+50
            let moveBullet = cc.sequence(cc.moveBy(2,cc.v2(-1000,0)),cc.delayTime(0.1))
            this.bulletAction= item.runAction(cc.sequence(moveBullet, cc.callFunc(()=>{
                item.opacity = 0
            })))
            this._listBullet.push(item)
        }

        // var dist = Variables.rbWhite.node.position.sub(playerPos).mag();
    },
    collisionBunny(data){
        this.boomSprite.node.x = data.element.x+100
        this.boomSprite.node.runAction(cc.sequence(cc.fadeIn(1),cc.fadeOut(1)))
        this.node.parent.getChildByName(data.element.name).destroy()
        data.element.stopAction(this.bulletAction)
    },
    collissionRip(){
        this.spineBoy.setAnimation(0, "death", true)
    },
    jumpTo() {

    },

    update(dt) {
        
    },
});
