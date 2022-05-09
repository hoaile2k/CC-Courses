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
    },
    onLoad() {
        Emitter.instance = new Emitter();
    },

    regisClick() {
        this._objUser = {
            userName: this.userName,
            password: this.pass,
            rePassword: this.rePass,
            email: this.email,
            phone: this.phone,
        }
        // this._listUser.push(this.objUser)
        Emitter.instance.emit(`${EmitName.regisClick}`, this._objUser);
        this.compListUser.node.active = true
        this.compRegisFrame.node.active = false
    },
    editUserBox(data){
        this.userName = data.string
    },
    editPassBox(data){
        this.pass = data.string
    },
    editRePassBox(data){
        this.rePass = data.string
    },
    editEmailBox(data){
        this.email = data.string
    },
    editPhoneBox(data){
        this.phone = data.string
    },
    backRegisClick(){
        this.compListUser.node.active = false
        this.compRegisFrame.node.active = true
    },
   
    start() {
        
    },
});