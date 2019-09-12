var GameConfig = require("./gameData/GameConfig");
cc.Class({
    extends: cc.Component,

    properties: {
        gamePlayerCount: {
            default: null,
            type: cc.ToggleContainer
        },
    },

    start () {
        this.initGameLoginView();
    },

    initGameLoginView () {
        switch (GameConfig.PlayerNum) {
            case 1:
                this.gamePlayerCount.node.getChildByName("Toggle OnePlayer").getComponent(cc.Toggle).isChecked = true;
                break;
            case 2:
                console.log(this.gamePlayerCount.node);
                this.gamePlayerCount.node.getChildByName("Toggle DoublePlayer").getComponent(cc.Toggle).isChecked = true;
                break;
        }
    },

    onGamePlayerNumToggleChecked (event, CoustomEventData) {
        switch (CoustomEventData) {
            case "onePlayer":
                GameConfig.PlayerNum = 1;
            break;
            case "doublePlayer":
                GameConfig.PlayerNum = 2;
            break;
        }
    },
});
