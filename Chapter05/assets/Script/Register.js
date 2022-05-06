cc.Class({
    extends: cc.Component,

    properties: {
        _yourUsername: "",
        _yourEmail: "",
        _yourPassword: "",
        _users: cc.Object,
        _listUser: [],
        showUser:{
            default: null,
            type: cc.Component
        },
        showPopupLogin:{
            default: null,
            type: cc.Component
        },
        resetUsernameBox:{
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
        },
    },

    // onLoad () {},
    getUsername(value){
        this._yourUsername = value
    },
    getEmail(value){
        this._yourEmail = value
    },
    getPassword(value){
        this._yourPassword = value
    },
    btnRegisterClick(){
        this._users = {
            id: this._listUser.length,
            userName: this._yourUsername,
            email: this._yourEmail,
            password: this._yourPassword
        }
        this._listUser.push(this._users)
        this.node.active = false
        this.showPopupLogin.node.active = true
        this.scheduleOnce(()=> {
            this.showPopupLogin.node.active = false
            this.showUser.node.active = true
        }, 1.5);
    },
    resetEditBox(){
        this.resetUsernameBox.string = ""
        this.resetEmailBox.string = ""
        this.resetPassBox.string = ""
    },
    start () {
        
    },

    // update (dt) {},
});
