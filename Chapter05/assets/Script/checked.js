cc.Class({
    extends: cc.Component,

    properties: {
        _nodeArray: [],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    checkedEvent(){
        this._nodeArray.push(this.node)
        cc.log(this._nodeArray)

    },
    removeNode(){
        cc.log(this._nodeArray)
        this.node.destroy()
    },
    start () {
       
    },

    // update (dt) {},
});
