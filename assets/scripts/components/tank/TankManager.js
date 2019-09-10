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
var GameConst = require("../gameData/GameConst");
var NodePoolManager = require("../NodePoolManager");
cc.Class({
    extends: cc.Component,

    editor:{
        // executeInEditMode: true
    },

    properties: {
        isAuto: false,
        isCanMove: true,
        tankSpriteAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        tankFlag: {
            default: GameEnum.TankFlag.Player,
            type: GameEnum.TankFlag,
            notify: function () {
                this.updateTank(this.tankFlag);
            }
        },
        enemyTankSpriteFrames: {
            default: [],
            type: cc.SpriteFrame
        },
        playerTankSpriteFrames: {
            default: [],
            type: cc.SpriteFrame
        },
        tankDirection: {
            default: GameConst.Dirction[0],
            notify: function () {
                this.updateTankSpriteFrame(this.tankDirection);
            }
        },
        actionSpeed: {
            default: 0.05,
            type: cc.Float,
            range: [0,3,0.01]
        },
        changeDirectionStep: {
            default: 10,
            type: cc.Integer,
            range: [0,100,1]
        },
        bullet: {
            default: null,
            type: cc.Prefab
        },
        _bornPosition: null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (!CC_EDITOR) {
            this.initTankAutoActionManager();
        }
        if (this.node.group === cc.game.groupList[2]) {
            this.node.getComponent(cc.Animation).play();
        }
    },

    initTank(direction, group, auto, position, tankFlag) {
        this.node._score = 0;
        this.tankDirection = direction;
        this.isAuto = auto;
        this.node.group = group;
        this.node.setPosition(position);
        if (tankFlag) {
            this.tankFlag = tankFlag;
        }
        this._bornPosition = position;
    },

    updateTank (type) {
        var newSpriteFrame = null;
        if (type === GameEnum.TankFlag.Enemy) {
            var spriteFrameIndex = Math.floor(Math.random() * this.enemyTankSpriteFrames.length);
            newSpriteFrame = this.enemyTankSpriteFrames[spriteFrameIndex];
            for (let i = 0; i < GameConst.EnemyTankTypes.length; i++) {
                if (newSpriteFrame.name.indexOf(GameConst.EnemyTankTypes[i].name) !== -1) {
                    this.node._tankType = GameConst.EnemyTankTypes[i].name;
                    this.node._score = GameConst.EnemyTankTypes[i].score;
                    this.actionSpeed = GameConst.EnemyTankTypes[i].speed;
                }
            }
        }
        else {
            newSpriteFrame = this.playerTankSpriteFrames[0];
        }
        this.node.getComponent(cc.Sprite).spriteFrame = newSpriteFrame;
    },

    updateTankSpriteFrame (newDirection, type) {
        var tankSprite = this.node.getComponent(cc.Sprite);
        var oldSpriteFrameName = tankSprite.spriteFrame.name;
        var newSpriteFrameName = null;
        
        for (let i = 0; i < GameConst.DirctionRex.length; i++) {
            
            newSpriteFrameName = oldSpriteFrameName.replace(GameConst.DirctionRex[i], newDirection);
            
            if (newSpriteFrameName !== oldSpriteFrameName) {
                break;
            }
        }
        if (this.tankSpriteAtlas.getSpriteFrame(newSpriteFrameName)) {
            tankSprite.spriteFrame = this.tankSpriteAtlas.getSpriteFrame(newSpriteFrameName);
        }
    },

    initTankAutoActionManager() {
        this.schedule(this.timerCallBack, this.actionSpeed);
    },

    timerCallBack () {
        if (this.isAuto) {
            //每走n步之后改变方向
            if (!this._changeDirectionStep || this._changeDirectionStep < 0) {
                this.changeTankDirection();
                this._changeDirectionStep = this.changeDirectionStep;
            }
            else {
                if (this._changeDirectionStep === Math.floor(this.changeDirectionStep / 2)) {
                    this.lauchBullet(cc.game.groupList[4]);
                }
                if (!cc.find("Canvas").getComponent("TiledMapManager").onTileMovedEvent(this.node)) {
                    this.changeTankDirection();
                }
                this._changeDirectionStep--;
            }
            cc.find("Canvas").getComponent("TiledMapManager").onTileMovedEvent(this.node);
        }
    },

    changeTankDirection () {
        var newDircetionIndex = Math.floor(Math.random() * GameConst.Dirction.length);
        this.node.getComponent("TankManager").tankDirection = GameConst.Dirction[newDircetionIndex];
    },

    lauchBullet (group) {
        var bullet = NodePoolManager.getNodeElement(group);
        if (!bullet) {
            bullet = cc.instantiate(this.bullet);
        }
        bullet._direction = this.node.getComponent("TankManager").tankDirection;
        cc.find("Canvas").getComponent("Game").tankWarMap.node.getChildByName("bullet").addChild(bullet);
        bullet.getComponent("BulletManager").initBullet(this.node, group);
        cc.find("Canvas").getComponent("SoundManager").playEffectSound("shoot", false);
    },

    onUnschedule () {
        this.unschedule(this.timerCallBack);
    },
});
