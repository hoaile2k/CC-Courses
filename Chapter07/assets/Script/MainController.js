const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        bulletPrefab: cc.Prefab,
        getBunny: cc.Component,
        boomSprite: cc.Sprite,
        _isAction: true,
        _canJump: true,
        _canRunning: true,

        _listBullet: [],

    },

    onLoad() {
        Emitter.instance = new Emitter()
        this.eventCollisionBunny = this.collisionBunny.bind(this)
        this.eventCollisionRip = this.collissionRip.bind(this)
        this.eventCollisionRipBunny = this.collissionRipBunny.bind(this)
        this.eventWining = this.collissionWinning.bind(this)

        Emitter.instance.registerOnce(emitName.eventCollisionBunny, this.eventCollisionBunny)
        Emitter.instance.registerOnce(emitName.collissionRip, this.eventCollisionRip)
        Emitter.instance.registerOnce(emitName.collissionBunny, this.eventCollisionRipBunny)
        Emitter.instance.registerOnce(emitName.win, this.eventWining)
    },

    start() {
        this.spineBoy.setAnimation(0, "portal", false)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);
    },

    onKeyUp: function (event) {
        this.actionForKeyCode(event.keyCode);
    },
    onKeyDown: function (event) {
        this.actionForKeyCodeUp(event.keyCode);
    },

    actionForKeyCodeUp: function (keyCode) {

        switch (keyCode) {
            case cc.macro.KEY.left: {
                this.moveLeftUp();
                break;
            }
            case cc.macro.KEY.right: {
                this.moveRightUp();
                break;
            }
            case cc.macro.KEY.up: {
                this.moveUpUp();
                break;
            }
        }
    },


    actionForKeyCode: function (keyCode) {
        if (!this._isAction) {
            return;
        }
        switch (keyCode) {

            case cc.macro.KEY.left: {
                this.moveLeft();
                break;
            }
            case cc.macro.KEY.right: {
                this.moveRight();
                break;
            }
            case cc.macro.KEY.space: {
                this.spaceShoot()
                break;
            }
        }
    },
    moveUpUp: function () {
        if (this._canJump) {
            this._canJump = false
            // this._isAction = false
            this.spineBoy.setAnimation(0, "hoverboard", false)
            if (this.spineBoy.node.scaleX > 0) {
                cc.tween(this.spineBoy.node)
                    .by(0.5, { y: 200 },)
                    .by(0.5, { y: -200 },)
                    .call(() => {
                        this._canJump = true
                        this._isAction = true
                    })
                    .start()
            }
            else {
                cc.tween(this.spineBoy.node)
                    .by(0.5, { y: 200 },)
                    .by(0.5, { y: -200 },)
                    .call(() => {
                        this._canJump = true
                        this._isAction = true

                    })
                    .start()
            }
        }
    },


    moveLeft: function () {
        if (this._isAction && this._canRunning) {
            this._isAction = false
            // this._canJump = true
            this.spineBoy.setAnimation(0, "run", true)
            this._canRunning = false
            this.spineTween =
                cc.tween(this.spineBoy.node)
                    .to(0, { scaleX: -0.3 })
                    .by(5, { x: -1500 })
                    .start()
        }
    },

    moveRight: function () {
        if (this._isAction && this._canRunning) {
            this._isAction = false
            // this._canJump = true
            this.spineBoy.setAnimation(0, "run", true)
            this._canRunning = false
            this.spineTween =
                cc.tween(this.spineBoy.node)
                    .to(0, { scaleX: 0.3 })
                    .by(5, { x: 1500 })
                    .start()
        }

    },
    moveRightUp: function (keyCode) {
        if (this._canRunning)
            return
        this._isAction = true
        if (this.spineTween) {
            this._canRunning = true
            this.spineTween.stop()
        }
        this.spineBoy.setAnimation(0, "idle", false)
    },
    moveLeftUp: function (keyCode) {
        if (this._canRunning)
            return
        this._isAction = true
        if (this.spineTween) {
            this._canRunning = true
            this.spineTween.stop()
        }
        this.spineBoy.setAnimation(0, "idle", false)
    },


    spaceShoot: function () {
        let bullet = this.bulletPrefab
        let item = cc.instantiate(bullet);
        if (this.spineBoy.node.scaleX > 0) {
            item.parent = this.node.parent;
            item.x = this.spineBoy.node.x + 50
            item.y = this.spineBoy.node.y + 50
            let moveBullet = cc.sequence(cc.moveBy(1, cc.v2(500, 0)), cc.delayTime(0.1))
            this.bulletAction = item.runAction(cc.sequence(moveBullet, cc.callFunc(() => {
                item.destroy()
            })))
            this._listBullet.push(item)
        }
        else {
            item.parent = this.node.parent;
            item.x = this.spineBoy.node.x - 150
            item.y = this.spineBoy.node.y + 50
            let moveBullet = cc.sequence(cc.moveBy(1, cc.v2(-500, 0)), cc.delayTime(0.1))
            this.bulletAction = item.runAction(cc.sequence(moveBullet, cc.callFunc(() => {
                item.opacity = 0
            })))
            this._listBullet.push(item)
        }
    },
    collisionBunny(data) {
        cc.log(data)
        let son = data.son
        let mom = data.mom
        let sonTalk = data.sonTalk
        cc.log(data)
        cc.log("son: ", son, "mom: ", mom)
        cc.tween(son.node)
            .delay(2)
            .call(()=>{
                sonTalk.string = "Mẹ ơi!!!"
                cc.tween(sonTalk.node)
                    .to(0,{scaleX: 0.5})
                    .start()
            })
            .to(0, { scaleX: 0.5 })
            .to(1, { x: 700 })
            .call(()=>{
                cc.tween(mom.node)
                    .to(2,{x: 350})
                    .start()
            })
            .start()
        // this.boomSprite.node.x = data.node.x
        // this.boomSprite.node.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(1)))

    },
    collissionRip(data) {
        this._isAction = false
        if (this.spineTween) { this.spineTween.stop() }
        data.node.active = true
        let text = data.node.getChildByName("richtext")
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);
        cc.tween(text)
            .call(() => {
                this.spineBoy.setAnimation(0, "death", true)

            })
            .by(1, { scale: 2 })
            .delay(0.5)
            .call(() => {
                cc.director.loadScene("Chapter07")
            })
            .start()
    },
    collissionRipBunny(data) {
        if (this.getBunny.node.scaleY > 0) {
            if (this.spineTween) { this.spineTween.stop() }
            this.spineBoy.setAnimation(0, "death", true)
            data.node.active = true
            let text = data.node.getChildByName("richtext")
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);
            cc.tween(text)
                .by(1, { scale: 2 })
                .delay(0.5)
                .call(() => {
                    cc.director.loadScene("Chapter07")
                })
                .start()
        }
    },
    collissionWinning(data) {
        data.node.getChildByName("richtext").getComponent("cc.RichText").string = "<color=#00ff00>You </color><color=#0fffff>Win</color>"
        this._isAction = false
        if (this.spineTween) { this.spineTween.stop() }
        this.spineBoy.setAnimation(0, "jump", true)
        data.node.active = true
        let text = data.node.getChildByName("richtext")
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);
        cc.tween(text)
            .by(1, { scale: 2 })
            .delay(0.5)
            .call(() => {
                cc.director.loadScene("Chapter07")
            })
            .start()
    },
    jumpTo() {

    },

    update(dt) {

    },
});
