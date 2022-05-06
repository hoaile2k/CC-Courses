cc.Class({
    extends: cc.Component,

    properties: {
        _nodeArray: [],
        content:{
            default: null,
            type: cc.Component
        },
        toggle:cc.Toggle
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    checkedEvent(){
       
    },
    removeNode(){
        let items = this.content.node.children;
        cc.log(items);
        
        items.forEach((element,index) => {
            if(items[index].getComponent("cc.Toggle").isChecked){
                items[index].destroy()
            }
        });
    },
    start () {
       
    },

    // update (dt) {},
});
