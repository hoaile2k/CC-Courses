cc.Class({
    extends: cc.Component,

    properties: {
        register: require("Register"),
        item: {
            default: null,
            type: cc.Prefab
        },
        // _labelString : cc.Object
    },

    // onLoad () {},
    insertUsers() {
        let listUser = this.register._listUser
        if(listUser.length>0){
            if (this.node.active) {
                let item = cc.instantiate(this.item);
                item.parent = this.node;
                item.y = listUser.length * (-30);
                this._labelString = this.node.children[listUser.length - 1].children[2].getComponent("cc.Label")
                this._labelString.string = listUser[listUser.length - 1].userName
            }
        }
        
    },
    start() {

    },

    // update(dt) {

    // },
});
