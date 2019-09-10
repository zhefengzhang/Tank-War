// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var GameEnum = require("../gameData/GameEnum");
var NodePoolManager = require("../components/NodePoolManager");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        var colliderManager = cc.director.getCollisionManager();
        colliderManager.enabled = true;
        // colliderManager.enabledDebugDraw = true;
    },

    onCollisionEnter (other, self) {
        NodePoolManager.putNodeElemenet(this.node.group, this.node);
        if (this.node.group === cc.game.groupList[1]) {
        }
        else if (this.node.group === cc.game.groupList[2]) {
            --cc.find("Canvas").getComponent("Game")._playerTankReviveTimes;
            cc.find("Canvas").getComponent("Game").updateGameMenuInfo(this.node, GameEnum.TankFlag.Player);
            cc.find("Canvas").getComponent("Game").updateScore(this.node._score)
            cc.find("Canvas").getComponent("SoundManager").playEffectSound("playerTankBoom", false);
        }
        else if (this.node.group === cc.game.groupList[3]) {
            --cc.find("Canvas").getComponent("Game")._enemyTankAmount;
            cc.find("Canvas").getComponent("Game").updateGameMenuInfo(this.node, GameEnum.TankFlag.Enemy);
            cc.find("Canvas").getComponent("Game").updateScore(this.node._score)
            cc.find("Canvas").getComponent("SoundManager").playEffectSound("enemyTankBoom", false);
        }
        else if (this.node.group === cc.game.groupList[4]) {

        }
    },

    onCollisionExit (other, self) {
        if (this.node.group === cc.game.groupList[0]) {
            
        }
        else if (this.node.group === cc.game.groupList[0]) {

        }
    },

    initGroup () {

    }
    // update (dt) {},
});
