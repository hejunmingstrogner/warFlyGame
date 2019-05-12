const {ccclass,property} = cc._decorator


import testMethod from './globalVari'
//  子弹生成的位置

@ccclass
class bulletPosition{
    
    @property({type:cc.String,tooltip:'子弹相对Hero的位置'})
    positionX = ''

}

// 无限时长子弹
@ccclass
class infiniteBullet{
    @property(cc.String)
    name = ''
    @property(cc.Integer)
    rate = 0
    @property(cc.Integer)
    poolAmount = 0
    @property(cc.Prefab)
    prefab:cc.Prefab = null
    @property({type:bulletPosition,tooltip:'子弹位置'})
    position:bulletPosition[] = []
}
// 有限时长子弹
@ccclass
class finiteBullet extends infiniteBullet{

    @property({type:cc.Integer})
    duration = 0
    @property({type:cc.String})
    ufoBulletName = ''
}
// 有限时长子弹
@ccclass
export default class NewClass extends cc.Component{

        @property({type:infiniteBullet,tooltip:'无限子弹'})
        infiniteBullet:infiniteBullet = null
        @property({type:finiteBullet,tooltip:'有限子弹'})
        finiteBullet:finiteBullet[] = []
        @property({type:cc.Node})
        hero = null
        @property(cc.AudioClip)
        bulletSound = null
        
        startShoot = null
        v:testMethod = testMethod.getInstance()

        onLoad(){

            // 初始化对象池
            this.v.common.initNodePool(this,this.infiniteBullet)
            this.v.common.batchInitNodePool(this,this.finiteBullet)
        }
         // 发射子弹，定时器
         startAction(){
            this.startShoot = ()=>{
                this.genNewBullet(this.infiniteBullet)
                cc.audioEngine.play(this.bulletSound,false,1)

            }
            this.startShoot.bind(this)
            this.schedule(this.startShoot,this.infiniteBullet.rate)
        }
         // 生成子弹   
          genNewBullet(bulletInfo){
            let poolName = bulletInfo.name + 'Pool'
            for(let i = 0;i < bulletInfo.position.length;i++){
                let newNode = this.v.common.getNewNode(this[poolName],bulletInfo.prefab,this.node)
                let pos = this.getBulletPosition(bulletInfo.position[i].positionX)
                newNode.setPosition(pos)

                newNode.getComponent('bullet').bulletGroup = this
            }

         }

        // 获取子弹位置
        getBulletPosition(positionStr){
            let heroP = this.hero.getPosition()
            let newV2_x = heroP.x + eval(positionStr)
            let newV2_y = heroP.y;
            return cc.p(newV2_x,newV2_y)
        } 


        // 更换子弹
        changeBullet(ufoBulletName){

            this.unschedule(this.startShoot)
            for(let i = 0;i < this.finiteBullet.length;i++){
                if(this.finiteBullet[i].ufoBulletName === ufoBulletName){
                    let startDoubleShoot = (i)=>{

                        this.genNewBullet(this.finiteBullet[i])
                        cc.audioEngine.play(this.bulletSound,false,1)
                    }
                    startDoubleShoot.bind(this,1) 
                    // 设置一个延时，当一个定时器走完之后，另一个昝结束，开始执行
                    this.schedule(startDoubleShoot,this.finiteBullet[i].rate,this.finiteBullet[i].duration)
                    let delay = this.finiteBullet[i].rate * this.finiteBullet[i].duration
                    this.schedule(this.startShoot,this.infiniteBullet.rate,cc.macro.REPEAT_FOREVER,delay)
                }

            }

        }

        // 销毁子弹
        destroyBullet(node){

            //  bullet 中是由bulletGroup调用，所以当前this 为bulletGroup
            this.v.common.putBackPool(this,node)

        }

}