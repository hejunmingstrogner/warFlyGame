const {ccclass,property} = cc._decorator

@ccclass
export default class NewClass extends cc.Component{

      @property(cc.Integer)
        speedMax = 0
      @property(cc.Integer)
        speedMin = 0
      @property({type:cc.AudioClip})
        getUfoSound = null

        speed = 0  
        ufoGroup = null


          onLoad (){
            //  速度随机[speedmax,speedMin]
            this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin


            let manager = cc.director.getCollisionManager()
            manager.enabled = true

        }  
            // 碰撞检测
             onCollisionEnter(other,self){

                    cc.audioEngine.play(this.getUfoSound,false,1)
                    this.ufoGroup.destroyUfo(this.node)
             }

             // called every frame, uncomment this function to activate update callback    
             udpate (dt){

                 this.node.y -= dt * this.speed
                // 出屏幕后
                 if(this.node.y < -this.node.parent.height / 2){

                     this.ufoGroup.destroyUfo(this.node)
                 }

             }



}