const Emitter = require('mEmitter');
const EmitName = require('EmitName')
cc.Class({
    extends: cc.Component,
    properties: {
        _objUser: {
            default: null
        },
        compRegisFrame: cc.Component,
        compListUser: cc.Component,
        loadingScene: cc.Component,
    },
    onLoad() {
        Emitter.instance = new Emitter();
    },

    regisClick() {
        if (this.userName && this.pass && this.rePass && this.email && this.phone && this.pass == this.rePass) {
            this._objUser = {
                userName: this.userName,
                password: this.pass,
                rePassword: this.rePass,
                email: this.email,
                phone: this.phone,
            }
            Emitter.instance.emit(`${EmitName.regisClick}`, this._objUser);
            this.compRegisFrame.node.active = false
            this.loadingScene.node.active = true
        }
        else{
            let stringMessage = this.compRegisFrame.node.getChildByName("mainRegis").getChildByName("Message")
            stringMessage.getComponent("cc.Label").string = "Vui lòng nhập đầy đủ thông tin"
            stringMessage.active = true
        }
        if(this.pass != this.rePass){
            let stringMessage = this.compRegisFrame.node.getChildByName("mainRegis").getChildByName("Message")
            stringMessage.getComponent("cc.Label").string = "Nhập lại mật khẩu không đúng"
        }
        

    },
    editUserBox(data) {
        if (data)
            this.userName = data.string
    },
    editPassBox(data) {
        if (data)
            this.pass = data.string
    },
    editRePassBox(data) {
        if (data)
            this.rePass = data.string
    },
    editEmailBox(data) {
        if (data)
            this.email = data.string
    },
    editPhoneBox(data) {
        if (data)
            this.phone = data.string
    },
    backRegisClick() {
        this.compListUser.node.active = false
        this.compRegisFrame.node.active = true
    },

    start() {

    },
});