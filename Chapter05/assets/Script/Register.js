cc.Class({
    extends: cc.Component,

    properties: {
        _yourEmail: "",
        _yourPassword: "",
        _users: cc.Object,
        _listUser: [],
        showUser:{
            default: null,
            type: cc.Component
        },
        resetEmailBox:{
            default: null,
            type: cc.Component
        },
        resetPassBox:{
            default: null,
            type: cc.Component
        }
    },

    // onLoad () {},
    getEmail(value){
        this._yourEmail = value
    },
    getPassword(value){
        this._yourPassword = value
    },
    btnRegisterClick(){
        this._users = {
            ID: this._listUser.length,
            email: this._yourEmail,
            password: this._yourPassword
        }
        this._listUser.push(this._users)
        this.node.active = false
        this.showUser.node.active = true
    },
    resetEditBox(){
        this.resetEmailBox.string = ""
        this.resetPassBox.string = ""
    },
    start () {
        this.node.on("click", this.resetEditBox,this)
    },

    // update (dt) {},
});
