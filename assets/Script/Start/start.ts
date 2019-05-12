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

         @property(cc.Animation)
         loadAnimation = null
         @property(cc.Button)
          startButton = null
         @property(cc.AudioClip)
          buttonSound = null

      onLoad(){
        
        this.loadAnimation.play()

        // 预先加载游戏场景
       cc.director.preloadScene('Game')

      }


      startGame(){

         cc.audioEngine.play(this.buttonSound,true,1)
         
         // 开始游戏，播放音效并转场

          cc.director.loadScene('Game')
   
      }

}
