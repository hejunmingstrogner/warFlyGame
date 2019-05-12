import enemy  from "./enemy"
import testMethod from './globalVari'
import hero from './hero'
import bulletGroup from './bulletGroup'
import ufoGroup from './ufoGroup'
import enemyGroup from './enemyGroup'
const {ccclass,property}  =  cc._decorator


@ccclass
export default class NewClass extends cc.Component{

    @property({type:cc.Button})
    pause:cc.Button = null

    @property({type:cc.Label})
    scoreDisplay:cc.Label = null

    @property({type:cc.Label})
    bombAmount:cc.Label = null

    @property({type:cc.Node})
    bombDisplay = null

    @property({type:cc.SpriteFrame,tooltip:'暂停按钮图片组'})
    pauseSprite:cc.SpriteFrame[] = []

    @property({type:cc.Node})
    hero:hero = null
  
    @property(cc.Node)
    bulletGroup:bulletGroup = null

    @property(cc.Node)
    enemyGroup:enemyGroup = null

    @property(cc.Node)
    ufoGroup:ufoGroup = null

    @property(cc.AudioClip)
    bgm = null

    @property(cc.AudioClip)
    gameOverSound = null

    @property(cc.AudioClip)
    bombSound = null

    @property(cc.AudioClip)
    buttonSound = null

    v:testMethod = testMethod.getInstance()
    
    onLoad(){
        this.initState()
        this.enemyGroup.startAction()
        this.bulletGroup.startAction()
        this.ufoGroup.startAction()

        // play bgm 
        cc.audioEngine.play(this.bgm,true,1)
    }

    initState(){
        this.v.commonState.pauseState = false
        this.v.commonState.bombAmount = 0
        this.v.commonState.gameScore = 0
    }
    // 暂停
    handlePause(){

        cc.audioEngine.play(this.buttonSound,false,1)
        if(this.v.commonState.pauseState){
            this.pause.normalSprite = this.pauseSprite[0]
            this.pause.pressedSprite = this.pauseSprite[1]
            this.pause.hoverSprite   = this.pauseSprite[2]
            // 开始正在运行的场景
            cc.director.resume()
            // 添加hero拖拽监听
            this.hero.onDrag()
            return this.v.commonState.pauseState = !this.v.commonState.pauseState
        }

        this.pause.normalSprite = this.pauseSprite[2]
        this.pause.pressedSprite = this.pauseSprite[3]
        this.pause.hoverSprite = this.pauseSprite[3]
        // 暂停游戏正在运行的场景
        cc.director.pause()
        // 移除Hero拖拽监听
        this.hero.offDrag()
    
        return this.v.commonState.pauseState = !this.v.commonState.pauseState
    }
    // 使用tnt炸弹
    useBobm(){

        if(this.v.commonState.bombAmount > 0){
            // 音效
            cc.audioEngine.play(this.bombSound,false,1)

            // 把当前的node.children 赋值给一个新的对象
            let enemy = new Array(...this.enemyGroup.node.children)
            for(let i = 0;i < enemy.length;i++){

                  enemy[i].getComponent('enemy').explodingAnim()

            }
            this.v.commonState.bombAmount--
            this.bombAmount.string = String(this.v.commonState.bombAmount)
        }
    }
    // 接收炸弹
    receiveBomb(){
         this.v.commonState.bombAmount ++
         this.bombAmount.string = String(this.v.commonState.bombAmount)
    }
    // 分数
    changeScore(score){
        this.v.commonState.gameScore += score
        this.scoreDisplay.string = this.v.commonState.gameScore.toString()
    }
    // 游戏结束
    gameOver(){
        this.v.common.clearAllPool()
        cc.audioEngine.play(this.gameOverSound,false,1)
        cc.director.loadScene('End')
    }

}       