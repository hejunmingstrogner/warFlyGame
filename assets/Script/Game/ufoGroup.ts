

import testMethod from './globalVari'
const {ccclass,property} = cc._decorator

@ccclass
class ufoG {

     @property(cc.String)
     name:string = ''
     @property(cc.Prefab)
     prefab = null
     @property(cc.Integer)
     freq = 0
     @property(cc.Integer)
     poolAmount = 0
     @property({type:cc.Integer,tooltip:'最大延时'})
     delayMax = 0
     @property({type:cc.Integer,tooltip:'最小延时'})
     delayMin = 0

}

@ccclass
export default class NewClass extends cc.Component{

    @property(ufoG)
     ufoG:ufoG[]  = []
    v:testMethod = testMethod.getInstance()
    onLoad(){

        this.v.common.batchInitNodePool(this,this.ufoG)
    }
    startAction (){

        for(let i = 0;i < this.ufoG.length;i++){
                let ufoName = this.ufoG[i].name
                let freq = this.ufoG[i].freq
                this[ufoName] = ((a)=>{
                    let delay = Math.random() * (this.ufoG[a].delayMax - this.ufoG[a].delayMin) + this.ufoG[a].delayMin
                    // 内存定时器，随机掉落时间
                    this.scheduleOnce((()=>{
                          this.genNewUfo(this.ufoG[a])

                    }).bind(this),a)
                }).bind(this,i)
                //  外层定时器, 循环掉落
                this.schedule(this[ufoName],freq)
   
        }
    }

        // 生成ufo
        genNewUfo(ufoInfo){
            let poolName = ufoInfo.name + 'Pool'
            let newNode = this.v.common.genNewUfo(this[poolName],ufoInfo.prefab,this.node)
            let pos = this.getNewEnemyPosition(newNode)
            newNode.setPosition(pos)
            newNode.getComponent('ufo').ufoGroup = this
        } 
        // 随机生成的位置
        getNewEnemyPosition(newEnemy){
            
            // 位于上方, 先不可见
            let randx = cc.randoMinus1To1() * (this.node.parent.width / 2 - newEnemy.width / 2)
            let randy = this.node.parent.height / 2 + newEnemy.height / 2
            
            return cc.v2(randx,randy)
        }
        // 销毁
        destroyUfo(node){

            this.v.common.putBackPool(this,node)

        }


}