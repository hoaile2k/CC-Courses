cc.Class({
    extends: cc.Component,

    properties: {
        register: require("Register"),
        item: {
            default: null,
            type: cc.Prefab
        },
        _count: 0,
    },

    // onLoad () {},
    insertUsers() {
        let listUser = this.register._listUser
        let labelString = this.item.data.children[2].getComponent("cc.Label")
        if (this.node.active) {
            labelString.string = listUser[listUser.length - 1].userName
            let item = cc.instantiate(this.item);
            item.parent = this.node;
            item.y = listUser.length * (-30);
        }
    },

    start() {

    },

    update(dt) {

    },
});
