const {ccclass,property}  =  cc._decorator

@ccclass
export default class NewClass extends cc.Component{

        @property({type:cc.Integer,tooltip:'敌机分数'})
        score = 0

        @property({type:cc.Integer,tooltip:'敌机血量'})
        HP = 0

        @property({type:cc.Integer})
        speedMax = 0
        @property(cc.Integer)
        speedMin = 0

        @property({type:cc.SpriteFrame,tooltip:'初始化图像'})
        initSpriteFrame = null
        @property({type:cc.AudioClip})
        explosionSound = null

        enemyHp = 0
        speed = 0
        enemyGroup = undefined

        onLoad(){

            this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin
            let manager = cc.director.getCollisionManager()
            manager.enabled = true
            this.enemyInit()
        }
        enemyInit(){

            this.enemyHp = this.HP;
            // 找到node 的Sprite 组件
            let nSprite = this.node.getComponent(cc.Sprite)
            // 初始化spriteFrame
            if(nSprite.spriteFrame != this.initSpriteFrame){
                nSprite.spriteFrame = this.initSpriteFrame
            }

        }
        // 碰撞检测
        onCollisionEnter(other,self){

            if(other.node.group !== 'bullet'){
                return
            }else if(this.enemyHp === 0){

                 this.enemyHp --
                 this.explodingAnim()

            }else if(this.enemyHp > 0){

                this.enemyHp --

            }

        }
        explodingAnim(){

            // 播放爆炸音效
            cc.audioEngine.play(this.explosionSound,false,1)
            let anim = this.getComponent(cc.Animation)
            let animName = this.node.name + '_exploding'
            anim.play(animName)
            anim.on('finished',this.onHandleDestroy,this)
        }

        // 
        update(dt){

            this.node.y -= dt * this.speed

            // 出屏幕后 回收节点
            if(this.node.y < -this.node.parent.height / 2){

                    this.enemyGroup.destroyEnemy(this.node)
            }


        }
        onHandleDestroy(){

            // 使用对象池 ， 需要参考bullet
            this.enemyGroup.destroyEnemy(this.node,this.score)
        }


}