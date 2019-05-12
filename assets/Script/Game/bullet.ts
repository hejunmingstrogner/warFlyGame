const {ccclass,property} = cc._decorator

@ccclass
export default class NewClass extends cc.Component{

    @property(cc.Integer)
    speed = 0
    bulletGroup = null
    onLoad(){
    

    }

    // 碰撞检测
    onCollisionEnter(other,self){

        this.bulletGroup.destroyBullet(self.node)

    }
    // called every frame
    update(dt){

        this.node.y += dt * this.speed
        if(this.node.y > this.node.parent.height){
            this.bulletGroup.destroyBullet(this.node)

        } }

}