cc.Class({
    extends: cc.Component,

    properties: {
        register: require("Register"),
        item: {
            default: null,
            type: cc.Prefab
        },
        _count: 0,
        // label: {
        //     type: cc.Label,
        //     default: this.item.data.children[2].getComponent("cc.Label"),
        // }
    },

    // onLoad () {},
    insertUsers() {
        let listUser = this.register._listUser
        let labelString = this.item.data.children[2].getComponent("cc.Label")
        // let checkItem = this.item.data.children[1].getComponent("cc.Label")
        cc.log(this.item)
        // cc.log(this.label.string = "tftft")
        
        if (this.node.active) {
            // listUser.forEach((element,index) => {
            //     let item = cc.instantiate(this.item);
            // });
            labelString.string = listUser[listUser.length - 1].userName + "  -  " + listUser[listUser.length - 1].email + "  -  " + listUser[listUser.length - 1].password
            let item = cc.instantiate(this.item);
            item.parent = this.node;
            item.y = listUser.length * (-30);
            cc.log(this.item.data.children[1])
        }

    },

    start() {

    },

    update(dt) {

    },
});
