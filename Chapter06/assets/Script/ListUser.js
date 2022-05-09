const Emitter = require('mEmitter');
const EmitName = require('EmitName')
cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        activeListUser: cc.Component,
        nodeParent: cc.Component,
        sliderChanged: cc.Slider,
        _listUser: [],
        regisClickEvent: null,
        _fontSize: 8,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start() {
        Emitter.instance = new Emitter();
        this.regisClickEvent = this.addItem.bind(this)
        Emitter.instance.registerEvent(`${EmitName.regisClick}`, this.regisClickEvent, this)

    },
    addItem(data) {
        this._listUser.push(data)
        let listUser = this._listUser
        let item = cc.instantiate(this.item);
        item.parent = this.nodeParent.node;
        item.getComponent("StringLabelUser").labelString.string = listUser[listUser.length-1].userName
    },
    sliderHandler(){
        if(this.sliderChanged.progress){
            this._fontSize = 8 + (0.125 * this.sliderChanged.progress * 64)
            this._listUser.forEach((element,index) => {
                let label = this.nodeParent.node.children[index].getChildByName("Label").getComponent("cc.Label")
                label.fontSize = this._fontSize
            });
        }
        
    },
    btnDeleteHandler() {
        let label = this.nodeParent.node.children
        for(let index = label.length-1; index >= 0 ; index--){
            if(label[index].getComponent("cc.Toggle").isChecked){
                // cc.log(label.children[index].getComponent("cc.Toggle").isChecked)
                this._listUser.splice(index,1)
                label[index].destroy()
            }
        }
        // label.forEach((element,index) => {
            
        // });
    }

    // update (dt) {},
});
