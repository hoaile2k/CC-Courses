const Emitter = require("mEmitter")
const EventName = require("EmitEventName")
cc.Class({
    extends: cc.Component,

    properties: {
        editUsername: cc.EditBox,
        editPass: cc.EditBox,
        editRePass: cc.EditBox,
        editEmail: cc.EditBox,
        editPhone: cc.EditBox,

        _listUser: []
    },
    userNameData(data){
        this._userName = data.string
    },
    passData(data){
        this._Pass = data.string
    },
    rePassData(data){
        this._RePass = data.string
    },
    emailData(data){
        this._Email = data.string
    },
    phoneEdit(data){
        this._Phone = data.string
    },
    onLoad () {
        Emitter.instance = new Emitter()
        this._eventOfRegis= this.btnRegisEvent.bind(this)
        this._eventOfLoading = this.loadingUser.bind(this)
        this._eventOfBackRegis = this.btnBackRegisEvent.bind(this)

        Emitter.instance.registerEvent(EventName.btnRegisClick, this._eventOfRegis)
        Emitter.instance.registerEvent(EventName.loading, this._eventOfLoading)
        Emitter.instance.registerEvent(EventName.btnBackRegis, this._eventOfBackRegis)
    },
    btnRegisEvent(data){
        if(this._userName&&this._Pass&&this._RePass&&this._Email&&this._Phone){
            let objUser = {
                userName: this._userName,
                password: this._Pass,
                rePassword: this._RePass,
                email: this._Email,
                phone: this._Phone,
            }
            this._listUser.push(objUser)
        }
        else{
            cc.log("nhap lai")
        }
        if(this._Pass!=this._RePass) {cc.log("nhap lai mat khau ko dung")}
        data.node.active = true
    },
    btnBackRegisEvent(data){
        if(data)
            data.node.active = true
    },
    loadingUser(data){
        data.node.active = true
    },
   
  

    start () {

    },

    // update (dt) {},
});
