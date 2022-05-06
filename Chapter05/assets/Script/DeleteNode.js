cc.Class({
    extends: cc.Component,

    properties: {
        _nodeArray: [],
        content:{
            default: null,
            type: cc.Component
        },
        register: require("Register"),
        sizeProgress: cc.Slider
    },


    // onLoad () {},
    checkedEvent(){
       
    },
    removeNode(){
        let items = this.content.node.children;
        items.forEach((element,index) => {
            if(items[index].getComponent("cc.Toggle").isChecked){
                items[index].destroy()
                this.register._listUser.splice(index,1)
            }
        });

    },
    changedFontSize(){
        let items = this.content.node.children;
        items.forEach((element,index) => {
            items[index].scale = this.sizeProgress.progress
            items[index].scale = this.sizeProgress.progress
            items[index].scale = this.sizeProgress.progress
        });
        
    },
    start () {

    },

    // update (dt) {},
});
