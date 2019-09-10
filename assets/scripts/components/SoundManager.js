// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    editor: {
        menu:"CustomComponent/AudioControl",
    },
    properties: {
        backGroupSound: {
            default: null,
            type: cc.AudioClip
        },

        loop: true,
        
        soundsVolume: {
            default: 1,
            range: [0,1,0.01],
            notify: function() {
                this.setSoundsVolume();
            }
        },

        effectsVolume: {
            default: 1,
            range: [0,1,0.01],
            notify: function () {
                this.setEffectsVolume();
            }
        },

        audioClipPool: {
            default: [],
            type: cc.AudioClip
        },
        
        _isPlaying: false,
        _audioId: null,
        _effectId: null,
    },

    playBackGroupSound (callback) {
        if (this.backGroupSound) {
            cc.audioEngine.stopAll();
            this._audioId = cc.audioEngine.play(this.backGroupSound, this.loop, this.soundsVolume);
            if (callback && typeof callback === "function") {
                cc.audioEngine.setFinishCallback(this._audioId, callback);
            }
        }
    },

    playEffectSound (command, loop, callback) {
        if (loop === null && loop === undefined) {
            var loop = this.loop;
        }
        if (command !== null && command !== undefined || this.audioClipPool.length > 0) {
            switch (command) {
                case "begin":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[0], loop);
                    break;
                case "nmoving":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[1], loop);
                    break;
                case "moving":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[2], loop);
                    break;
                case "shoot":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[3], loop);
                    break;
                case "steel":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[4], loop);
                    break;
                case "enemyTankBoom":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[5], loop);
                    break;
                case "playerTankBoom":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[6], loop);
                    break;
                case "gameOver":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[7], loop);
                    break;
                case "pause":
                case "resume":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[8], loop);
                    break;
                case "bouns":
                    this._effectId = cc.audioEngine.playEffect(this.audioClipPool[9], loop);
                    break;
                default:
                    console.error("Command is invalid");
            }
        }
        if (typeof callback === "function") {
            cc.audioEngine.setFinishCallback(this._effectId, callback);
        }
    },

    pauseMusic () {
        cc.audioEngine.pauseAll();
    },

    resumeMusic () {
        cc.audioEngine.resumeAll();
    },

    setSoundsVolume() {
        if (this._audioId) {
            cc.audioEngine.setVolume(this.soundsVolume);
        }
    },

    setEffectsVolume () {
        if (this._effectId) {
            cc.audioEngine.setEffectsVolume(this.effectsVolume);
        }
    },

    stopAll () {
        cc.audioEngine.stopAll();
        this._audioId = null;
        this._effectId = null;
    },

    playStartGameEffectSound () {
        this.playEffectSound("begin", false, ()=>{
            this.playEffectSound("nmoving", true);
        });
    },
});
