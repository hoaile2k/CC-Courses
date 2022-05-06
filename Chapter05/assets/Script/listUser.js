cc.Class({
    extends: cc.Component,

    properties: {
        register: require("Register"),
        item: {
            default: null,
            type: cc.Prefab
        },
    },

    // onLoad () {},
    insertUsers() {
        let listUser = this.register._listUser
        if (this.node.active) {
            let item = cc.instantiate(this.item);
            item.parent = this.node;
            item.y = listUser.length * (-30);
            let labelString = this.node.children[listUser.length - 1].children[2].getComponent("cc.Label")
            labelString.string = listUser[listUser.length - 1].userName
        }

    },

    start() {

    },

    // update(dt) {

    // },
});
