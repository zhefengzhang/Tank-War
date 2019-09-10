// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var NodePoolManager = require("../NodePoolManager");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        lauchStep: {
            default: 1,
            type: cc.Float,
            range: [0,1,0.01]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    initBullet (tank, group) {
        this.node._score = 0;
        this.node.group = group;
        this.node.position = tank.position;
        this.schedule(this.timerCallBack, this.lauchStep);

    },

    timerCallBack (direction) {
        if (this.node.position.x === -208 || this.node.position.x === 204 || this.node.position.y === -204 || this.node.position.y === 208) {
            NodePoolManager.putNodeElemenet(this.node.group, this.node);
            return;
        }
        else {
            cc.find("Canvas").getComponent("TiledMapManager").onTileMovedEvent(this.node);
        }
    },

    onDisable () {
        this.unschedule(this.timerCallBack);
    }
    // update (dt) {},
});
