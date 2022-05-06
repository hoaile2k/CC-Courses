cc.Class({
    extends: cc.Component,

    properties: {
        _nodeArray: [],
        content:{
            default: null,
            type: cc.Component
        },
        register: require("Register"),
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    checkedEvent(){
       
    },
    removeNode(){
        let items = this.content.node.children;
        items.forEach((element,index) => {
            if(items[index].getComponent("cc.Toggle").isChecked){
                items[index].destroy()
                cc.log(index)
                this.register._listUser.splice(index,1)
            }
        });

    },
    start () {

    },

    // update (dt) {},
});
