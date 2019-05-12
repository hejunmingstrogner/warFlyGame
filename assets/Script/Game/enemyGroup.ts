import main from "./main"
import globalVari  from "./globalVari"
import testMehtod from "./globalVari";
const {ccclass,property} = cc._decorator

@ccclass
class enemyG{
    @property({type:cc.String})
    name = ''
    @property({type:cc.Prefab})
    prefab:cc.Prefab = null
    @property({type:cc.Float})
    freq = 0
    @property({type:cc.Integer})
    poolAmount = 0

}

@ccclass
export default class NewClass extends cc.Component{

    @property(enemyG)
    enemyGroup:enemyG[] = []
    @property(main)
    mainScript:main = null
    v:testMehtod = testMehtod.getInstance()

    
    onLoad(){

        this.v.common.batchInitNodePool(this,this.enemyGroup)

    }

    // 敌机出动
     startAction(){
           // 每组敌机都需要设置定时器
         for(let i = 0; i < this.enemyGroup.length;i++){
             let groupName = this.enemyGroup[i].name
             let freq = this.enemyGroup[i].freq
             this[groupName] = (()=>{
                this.genNewEnemy(this.enemyGroup[i])

             }).bind(this,i)
             this.schedule(this[groupName],freq)
         }

     }
     // 生成敌机
     genNewEnemy(enemyInfo){
        let poolName = enemyInfo.name + 'Pool'
        let newNode = this.v.common.genNewNode(this[poolName],enemyInfo.prefab,this.node)
        let pos = this.getNewEnemyPosition(newNode)
        newNode.setPosition(pos)
        newNode.getComponent('enemy').enemyGroup = this
        // 初始化敌机状态
        newNode.getComponent('enemy').enemyInit()
    }
     //敌机随机生成的位置
     getNewEnemyPosition(newEnemy){
        // 位于上方，先不可见
        let randx = (Math.random() - 0.5) * 2 * (this.node.parent.width / 2 - newEnemy.width / 2)
        let randy = this.node.parent.height / 2 + newEnemy.height / 2
        return cc.v2(randx,randy)
     }
     //销毁
     destoryEnemy(node,score = 0){
            this.v.common.putBackPool(this,node)
            score && this.mainScript.changeScore(score)
     }

}