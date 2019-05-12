
const {ccclass,property}  =  cc._decorator

@ccclass
export default class NewClass extends cc.Component{



        @property(cc.Node)
        bulletGroup = null
        @property(cc.Node)
        mainScript = null

        onLoad(){
          // 监听拖拽事件
           this.onDrag()    
          // 获取碰撞检测系统
           let manager = cc.director.getCollisionManager()
          // 开启碰撞检测系统
            manager.enabled = true
        }   

         // 添加拖拽监听事件
         onDrag (){

            this.node.on('touchmove',this.onHandleHeroMove,this)
         }
         // 去掉拖动监听
         offDrag(){

            this.node.off("touchmove",this.onHandleHeroMove,this)
         }
         // Hero 拖动
         onHandleHeroMove (event) {
            //  touchmove 事件中 event.getLocation() 获取当前以左下角为锚点的触点位置(world point)
            let position = event.getLocation()
            //  实际hero是background的子元素,所以坐标应该是随自己的父元素进行的，所以我们要将"word point" 转换为 "node point"
            let location = this.node.parent.convertToNodeSpaceAR(position)
            this.node.setPosition(location)

        }

        // 碰撞组件
        onCollisionEnter(other,self){
            if(other.node.group === 'ufo'){
                switch(other.node.name){

                    case 'doubleBullet':
                      this.bulletGroup.changeBullet(other.node.name)
                        break
                    case 'tnt':
                        this.mainScript.receiveBomb()
                        break

                }


            }else if(other.node.group === 'enemy'){
                 let anim = this.getComponent(cc.Animation)
                 let animName = this.node.name + '_exploding'
                 anim.play(animName)
                 anim.on('finished',this.onHandleHeroMove,this)
            }

        }
        
        onHandleDestroy(){

            //  暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应
            this.offDrag()
            //  游戏结束转场
            this.mainScript.gameOver()
        }
        

}