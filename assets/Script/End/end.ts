import testMehtod from "../Game/globalVari";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    newScore = null
    @property(cc.Button)
    restartBtn = null
    @property(cc.Button)
    historyBtn = null
    @property(cc.Button)
    quitBtn = null
    @property(cc.AudioClip)
    buttonSound = null

    v:testMehtod = testMehtod.getInstance()

    // use thie for initialization
    onLoad(){
        this.newScore.string = this.v.commonState.gameScore ? this.v.commonState.gameScore.toString() : '0'    
    }
    restartGame(){
        cc.audioEngine.play(this.buttonSound,false,1)
        cc.director.loadScene('Game')
    }
    quitGame(){
        cc.audioEngine.play(this.buttonSound,false,1)
        cc.director.loadScene('Start')
    }

    start () {

    }

    // update (dt) {}
}
