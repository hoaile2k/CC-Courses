
cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        bulletPrefab: cc.Prefab,
        _isAction: true,
        getBunny: cc.Component,
        _listBullet: []
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

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
            this.spineBoy.setAnimation(0, "hoverboard", true)
            if (this.spineBoy.node.scaleX > 0) {
                cc.tween(this.spineBoy.node)
                    .by(0.5, { x: 150, y: 150 },{ easing: 'smooth'})
                    .by(0.5, { x: 150, y: -150 },{ easing: 'smooth'})
                    .call(() => {
                        this.spineBoy.setAnimation(0, "idle", false)
                        this._isAction = true
                    })
                    .start()
            }
            else {
                cc.tween(this.spineBoy.node)
                .by(0.5, { x: -150, y: 150 })
                .by(0.5, { x: -150, y: -150 })
                .call(() => {
                    this.spineBoy.setAnimation(0, "idle", false)
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
            this.spineBoy.setAnimation(0, "run", true)
            cc.tween(this.spineBoy.node)
                .to(0, { scaleX: -0.3 })
                .by(0.5, { x: -50 })
                .call(() => {
                    this.spineBoy.setAnimation(0, "idle", false)
                    this._isAction = true
                })
                .start()
        }
    },

    moveRight: function () {
        if (this._isAction) {
            this.spineBoy.setAnimation(0, "run", true)
            cc.tween(this.spineBoy.node)
                .to(0, { scaleX: 0.3 })
                .by(0.5, { x: 50 })
                .call(() => {
                    this.spineBoy.setAnimation(0, "idle", false)
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
            item.x = this.spineBoy.node.x
            item.y = this.spineBoy.node.y+100
            let moveBullet = cc.sequence(cc.moveBy(1,cc.v2(1500,0)),cc.delayTime(0.1))
            item.runAction(cc.sequence(moveBullet, cc.callFunc(()=>{
                item.opacity = 0
            })))
            this._listBullet.push(item)
            // cc.log(item.parent)
            // cc.log("con thỏ", this.getBunny.node.parent)
        }
        else{
            item.parent = this.node.parent;
            item.x = this.spineBoy.node.x
            item.y = this.spineBoy.node.y+100
            item.runAction(cc.moveBy(10,cc.v2(-1500,0)))
            this._listBullet.push(item)
        }

        // var dist = Variables.rbWhite.node.position.sub(playerPos).mag();
    },
    jumpTo() {

    },

    update(dt) {
        let bunnyPos = this.getBunny.node.x
        this._listBullet.forEach((element,index) => {
            let bulletPos = element.x
            // cc.log(bunnyPos, bulletPos)
            if(bulletPos >= bunnyPos){
                this.getBunny.node.stopAction(this.getBunny.node.getComponent("bunnyMove")._bunnyAction)
                cc.log(this.getBunny.node.getComponent("bunnyMove")._bunnyAction)
                // cc.log(  this.getBunny)
            }
        });
    },
});
