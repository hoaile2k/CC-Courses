const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        bulletPrefab: cc.Prefab,
        getBunny: cc.Component,
        boomSprite: cc.Sprite,
        getScore: cc.Label,
        _isAction: true,
        _canJump: true,
        _canRunning: true,
        _endGame: false,
        _listBullet: [],
        _score: 100,
    },

    onLoad() {
        Emitter.instance = new Emitter()
        this.eventKillBunny = this.killBunny.bind(this)
        this.eventCollRock = this.collRock.bind(this)
        this.eventCollisionBunny = this.collBunny.bind(this)
        this.eventWining = this.collissionWinning.bind(this)
        this.eventCollGround = this.collGround.bind(this)


        Emitter.instance.registerEvent(emitName.collGround, this.eventCollGround)
        Emitter.instance.registerEvent(emitName.killBunny, this.eventKillBunny)
        Emitter.instance.registerOnce(emitName.collRock, this.eventCollRock)
        Emitter.instance.registerOnce(emitName.win, this.eventWining)
        Emitter.instance.registerOnce(emitName.collissionBunny, this.eventCollisionBunny)
    },

    start() {
        this.spineBoy.setAnimation(0, "portal", false)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);
        this.updateScore()
        // this.score = 100
        this.schedule(this.updateScore, 1, 100)
    },

    updateScore: function () {

        this.getScore.string = "Score: " + this._score--
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
            this.spineBoy.setAnimation(0, "jump", false)
            if (this.spineBoy.node.scaleX > 0) {
                cc.tween(this.spineBoy.node)
                    .by(0.5, { y: 200 },)
                    .by(0.5, { y: -200 },)
                    .call(() => {
                        this._canJump = true
                        this._isAction = true
                        if (this.playerCollGround) {
                            this.spineBoy.addAnimation(0, "idle", true)
                        }
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
        if (!this._canJump) {
            this.spineBoy.setAnimation(0, "jump", true)
            cc.log(this.playerCollGround)
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
        if (!this._canJump) {
            this.spineBoy.setAnimation(0, "jump", false)
            cc.log("jump right")
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
            item.y = this.spineBoy.node.y + 15
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
    //Kill bunny
    killBunny(data) {
        let son = this.getBunny
        cc.log(data)
        let hp = this.getBunny.node.getChildByName("HP").getComponent("cc.ProgressBar")
        hp.progress -= 0.05

        if (hp.progress <= 0) {
            cc.tween(son.node)
                .to(0.5, { angle: -90, y: -270 })
                .call()
                .start()
        }
        else {
            cc.tween(this.boomSprite.node)
                .to(0.1, { opacity: 255 })
                .to(0.1, { opacity: 0 })
                .start()

            data.node.destroy()
        }


    },
    collRock: function (data) {
        this.loseScreen(data)
    },
    collBunny: function (data) {
        if (this.getBunny.node.angle < 0) {
            return
        }
        this.loseScreen(data)
    },
    loseScreen(data) {
        this._endgame = true
        this._isAction = false
        this.unschedule(this.updateScore);
        if (this.spineTween) { this.spineTween.stop() }
        data.node.active = true
        let text = data.node.getChildByName("richtext")
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);
        const scoreValue = this._score
        // cc.tween(this.getScore)
        //     .to(0,{string: 0})
        //     .to(2, {string: "score: "+ scoreValue})
        //     .start()
        cc.log(this.getScore)
        cc.tween(text)
            .call(() => {
                this.spineBoy.setAnimation(0, "death", true)
            })
            .by(1, { scale: 2 })
            .delay(0.5)
            // .call(() => {
            //     cc.director.loadScene("Chapter07")
            // })
            .start()
    },
    collGround() {
        this.playerCollGround = true
        if (this._canJump && !this._canRunning && !this._endgame) {
            this.spineBoy.setAnimation(0, "run", true)
        }
    },
    collissionWinning(data) {
        this._endgame = true
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);
        Emitter.instance.removeEvent(emitName.collissionBunny, this.eventCollisionBunny)
        Emitter.instance.removeEvent(emitName.collGround, this.eventCollGround)
        Emitter.instance.removeEvent(emitName.killBunny, this.eventKillBunny)
        Emitter.instance.removeEvent(emitName.collRock, this.eventCollRock)
        Emitter.instance.removeEvent(emitName.win, this.eventWining)

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
        this.node.getComponent(cc.BoxCollider).offset = cc.v2(this.spineBoy.findBone("torso").worldX, this.spineBoy.findBone("torso3").worldY);
    },
});
