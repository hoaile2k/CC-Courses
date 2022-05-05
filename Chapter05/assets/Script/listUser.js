cc.Class({
    extends: cc.Component,

    properties: {
        register: require("Register"),
        item:{
            default: null,
            type: cc.Prefab
        },
        _count: 0
    },

    // onLoad () {},
    insertUsers(){
        let listUser = this.register._listUser
        let email = listUser.map(object => object.email)
        let search = email.includes(email[listUser.length-1])
        cc.log(search, email, email[listUser.length-1])
        if(this.node.active ){
            let item = cc.instantiate(this.item);
                item.parent = this.node;
                item.y = listUser.length * (-30);
            item.getComponent("cc.Label").string = listUser[listUser.length-1].userName + "  -  " + listUser[listUser.length-1].email + "  -  " + listUser[listUser.length-1].password
            cc.log(listUser)
        }

    },

    start () {
        
    },

    update (dt) {
        
    },
});
