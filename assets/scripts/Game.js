var GameEnum = require("./gameData/GameEnum");
var GameConst = require("./gameData/GameConst");
var GameConfig = require("./gameData/GameConfig");
var NodePoolManager = require("./components/NodePoolManager");
cc.Class({
    extends: cc.Component,

    editor: {
        // executeInEditMode: true
    },

    properties: {
        loginGame: {
            default: null,
            type: cc.Node
        },
        playGame: {
            default: null,
            type: cc.Node
        },
        tankWarMap:{
            default: null,
            type: cc.TiledMap
        },
        tankSpriteAtlas: {
            default: null,
            type:  cc.SpriteAtlas
        },
        anyTank: {
            default: null,
            type: cc.Prefab
        },
        bullet: {
            default: null,
            type: cc.Prefab
        },
        gameMenu: {
            default: null,
            type: cc.Node
        },
        enemyTankBornPosition: {
            default: [],
            type: cc.Vec2
        },
        playerTankBornPosition: {
            default: [],
            type: cc.Vec2
        },
        _initialRound: 1,
        _enemyTankAmount: 0,
        _playerTankReviveTimes: 0,
        _playing: false,
        _playerTank: [],
        _gameScore: 0,
    },

    initGame() {
        NodePoolManager.initNoedPools();
    },

    startGame () {
        this._playing = true;
        this.initGameMenuInfo();
        this.clearTanks();
        for (let i = 0; i < GameConst.EnemyTankAmount; i++) {
            if (i < 2) {
                this.createEnemyTank(this.enemyTankBornPosition[i]);
            }
        }
        for (let i = 0; i < GameConfig.PlayerNum; i++) {
            let playerTank = this.createPlayerTank(this.playerTankBornPosition[i]);
            this._playerTank.push(playerTank);
        }
        this.initListenHandlers();
    },

    initGameMenuInfo() {
        this.gameMenu.getChildByName("Label Tank Remaining Number").getComponent(cc.Label).string = this._enemyTankAmount = GameConst.EnemyTankAmount;
        this.gameMenu.getChildByName("Label Revive Times Number").getComponent(cc.Label).string = this._playerTankReviveTimes = GameConst.PlayerTankReviveTimes;
    },

    initListenHandlers () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onPlayerKeyDownCallback, this);
    },

    unListenHandlers () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onPlayerKeyDownCallback, this);
    },

    createEnemyTank (position) {
        if (this.node.getComponent("Game")._playing) {
            this.enemyTank = NodePoolManager.getNodeElement(cc.game.groupList[3]);
            if (!this.enemyTank) {
                this.enemyTank = cc.instantiate(this.anyTank);
            }
            this.enemyTank.getComponent("TankManager").initTank(GameEnum.TankFlag.Enemy, GameConst.Dirction[0], cc.game.groupList[3], 
                true, position);
            this.tankWarMap.node.getChildByName("tank").addChild(this.enemyTank);
        }
    },

    createPlayerTank (position) {
        if (this.node.getComponent("Game")._playing) {
            this.playerTank = NodePoolManager.getNodeElement(cc.game.groupList[2]);
            if (!this.playerTank) {
                this.playerTank = cc.instantiate(this.anyTank);
            }
            this.playerTank.getComponent("TankManager").initTank(GameEnum.TankFlag.Player, GameConst.Dirction[0], cc.game.groupList[2], 
                false, position);
            this.tankWarMap.node.getChildByName("tank").addChild(this.playerTank);
            return this.playerTank;
        }
    },

    onPlayerKeyDownCallback (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
                if (!this._playerTank[0]) return;
                this._playerTank[0].getComponent("TankManager").tankDirection = GameConst.Dirction[0];
                this.node.getComponent("TiledMapManager").onTileMovedEvent(this._playerTank[0]);
            break;
            case cc.macro.KEY.a: 
                if (!this._playerTank[0]) return;
                this._playerTank[0].getComponent("TankManager").tankDirection = GameConst.Dirction[1];
                this.node.getComponent("TiledMapManager").onTileMovedEvent(this._playerTank[0]);
            break;
            case cc.macro.KEY.s:
                if (!this._playerTank[0]) return;
                this._playerTank[0].getComponent("TankManager").tankDirection = GameConst.Dirction[2];
                this.node.getComponent("TiledMapManager").onTileMovedEvent(this._playerTank[0]);
            break;
            case cc.macro.KEY.d:
                if (!this._playerTank[0]) return;
                this._playerTank[0].getComponent("TankManager").tankDirection = GameConst.Dirction[3];
                this.node.getComponent("TiledMapManager").onTileMovedEvent(this._playerTank[0]);
            break;
            case cc.macro.KEY.up :
                if (!this._playerTank[1]) return;
                this._playerTank[1].getComponent("TankManager").tankDirection = GameConst.Dirction[0];
                this.node.getComponent("TiledMapManager").onTileMovedEvent(this._playerTank[1]);
            break;
            case cc.macro.KEY.left: 
                if (!this._playerTank[1]) return;
                this._playerTank[1].getComponent("TankManager").tankDirection = GameConst.Dirction[1];
                this.node.getComponent("TiledMapManager").onTileMovedEvent(this._playerTank[1]);
            break;
            case cc.macro.KEY.down:
                if (!this._playerTank[1]) return;
                this._playerTank[1].getComponent("TankManager").tankDirection = GameConst.Dirction[2];
                this.node.getComponent("TiledMapManager").onTileMovedEvent(this._playerTank[1]);
            break;
            case cc.macro.KEY.right:
                if (!this._playerTank[1]) return;
                this._playerTank[1].getComponent("TankManager").tankDirection = GameConst.Dirction[3];
                this.node.getComponent("TiledMapManager").onTileMovedEvent(this._playerTank[1]);
            break;
            case cc.macro.KEY.space:
                if (!this._playerTank[0]) return;
                this._playerTank[0].getComponent("TankManager").lauchBullet(cc.game.groupList[1]);
                break;
            case cc.macro.KEY.pageup:
                if (!this._playerTank[1]) return;
                this._playerTank[1].getComponent("TankManager").lauchBullet(cc.game.groupList[1]);
                break;
        }
    },

    onPlayGameButtonClicked () {
        this.loginGame.opacity = false;
        this.loginGame.y += this.node.height;
        this.playGame.opacity = 255;
        this.node.getComponent("SoundManager").playStartGameEffectSound();
        this.initGame();
        this.startGame();
    },

    updateScore (score) {
        this._gameScore += score;
        this.gameMenu.getChildByName("Label Score Number").getComponent(cc.Label).string = this._gameScore;
        
    },

    updateGameMenuInfo (targetNode, tankTag) {
        if (cc.find("Canvas").getComponent("Game")._enemyTankAmount > 0 && cc.find("Canvas").getComponent("Game")._playerTankReviveTimes > 0) {
            this.createNewTank(targetNode, tankTag);
        }
        else if (cc.find("Canvas").getComponent("Game")._enemyTankAmount > 0 && cc.find("Canvas").getComponent("Game")._playerTankReviveTimes === 0){
            this.onGameOverEvent("lose");
        }
        else if (cc.find("Canvas").getComponent("Game")._enemyTankAmount === 0 && cc.find("Canvas").getComponent("Game")._playerTankReviveTimes > 0) {
            this.onNextRoundEvent();
        }
        else if (cc.find("Canvas").getComponent("Game")._enemyTankAmount === 0 && cc.find("Canvas").getComponent("Game")._playerTankReviveTimes === 0){
            this.onNextRoundEvent();
        }
    },

    createNewTank (targetNode, tankTag) {
        if (tankTag === GameEnum.TankFlag.Enemy) {
            cc.find("Canvas").getComponent("Game").gameMenu.getChildByName("Label Tank Remaining Number").getComponent(cc.Label).string = cc.find("Canvas").getComponent("Game")._enemyTankAmount;
            cc.find("Canvas").getComponent("Game").createEnemyTank(targetNode.getComponent("TankManager")._bornPosition);
        }
        else if (tankTag === GameEnum.TankFlag.Player) {
            cc.find("Canvas").getComponent("Game").gameMenu.getChildByName("Label Revive Times Number").getComponent(cc.Label).string = cc.find("Canvas").getComponent("Game")._playerTankReviveTimes;
            cc.find("Canvas").getComponent("Game").createPlayerTank(targetNode.getComponent("TankManager")._bornPosition);
        }
    },

    onPauseOrResumeGameEvent () {
        this._playing = !this._playing;
        if (!this._playing) {
            cc.find("Canvas").getComponent("SoundManager").playEffectSound("pause", false);
            for (let i = 0; i< this.tankWarMap.node.getChildByName("tank").childrenCount; i++) {
                this.tankWarMap.node.getChildByName("tank").children[i].getComponent("TankManager").isCanMove = false;
                cc.director.getScheduler().pauseTarget(this.tankWarMap.node.getChildByName("tank").children[i].getComponent("TankManager"));
            }
            this.gameMenu.getChildByName("Button Game Pause").getChildByName("Label Button").getComponent(cc.Label).string = "resume";
            console.log("[Game Pause]");
        }
        else {
            cc.find("Canvas").getComponent("SoundManager").playEffectSound("resume", false);
            for (let i = 0; i< this.tankWarMap.node.getChildByName("tank").childrenCount; i++) {
                this.tankWarMap.node.getChildByName("tank").children[i].getComponent("TankManager").isCanMove = true;
                cc.director.getScheduler().resumeTarget(this.tankWarMap.node.getChildByName("tank").children[i].getComponent("TankManager"));
            }
            this.gameMenu.getChildByName("Button Game Pause").getChildByName("Label Button").getComponent(cc.Label).string = "pause";
            console.log("[Game Resume]");
        }
        
    },
    
    onNextRoundEvent () {
        ++this._initialRound;
        if (this._initialRound <= this.node.getComponent("TiledMapManager").tiledMapAssets.length) {
            this.tankWarMap.tmxAsset = this.node.getComponent("TiledMapManager").tiledMapAssets[this._initialRound - 1];
            this.gameMenu.getChildByName("Label Round Number").getComponent(cc.Label).string = this._initialRound;
            this.node.getComponent("TiledMapManager").initTiledMapData();
            this.node.getComponent("SoundManager").playStartGameEffectSound();
            this.startGame();
        }
        else {
            this.onGameOverEvent("win");
        }
    },

    restartGame () {
        this._playing = false;
        this.unListenHandlers();
        this._playerTank = [];
        this.node.getComponent("SoundManager").stopAll();
        cc.director.loadScene("game");
    },

    onSliderSwitchEvent (slider, CustomEventData) {
        let volume = slider.progress;
        if (CustomEventData === "bgm") {
            this.node.getComponent("SoundManager").soundsVolume = volume;
        }
        else if (CustomEventData === "effect") {
            this.node.getComponent("SoundManager").effectsVolume = volume;
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

    onGameOverEvent (command) {
        this._playing = false;
        if (command === "win") {
            this.node.getComponent("SoundManager").playEffectSound("begin", false);
            console.log("[Game Win]");
        }
        else if (command === "lose") {
            cc.find("Canvas").getComponent("SoundManager").playEffectSound("gameOver", false);
            console.log("[Game Lose]");
        }
        this.restartGame();
    },

    clearTanks () {
        this._playerTank = [];
        for (let i = 0; i < this.tankWarMap.node.getChildByName("tank").childrenCount; i++) {
            NodePoolManager.putNodeElemenet(this.tankWarMap.node.getChildByName("tank").children[i].group, this.tankWarMap.node.getChildByName("tank").children[i]);
        }
    }
});
