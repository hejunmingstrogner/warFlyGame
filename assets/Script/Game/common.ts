// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import testMehtod from "./globalVari";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    v:testMehtod = null

    onLoad(){

        this.v = testMehtod.getInstance()
        this.v.common = this
        console.log('commonet onload method is used')
    }

    // 批处理对象池
    batchInitNodePool(that,objArray){
        for(let i=0;i < objArray.length;i++){
                let objInfo = objArray[i]
                this.initNodePool(that,objInfo)

        }


    }
    // 初始化对象池
    initNodePool (that,objInfo){

        let name = objInfo.name
        let poolName = name + 'Pool'

        that[poolName] = new cc.NodePool()
        // 备份在commonState中,方便clear
        this.v.commonState.poolObj[poolName] = that[poolName]
        // 创建对象，并放入池中
        for(let i = 0;i < objInfo.poolAmount;i++){
            let newNode = cc.instantiate(objInfo.prefab)
            that[poolName].put(newNode)
        }
    }

        // 生成节点
      getNewNode(pool,prefab,nodeParent){
            let newNode = null
            if(pool.size() > 0){
                newNode = pool.get()
            }else{

                newNode = cc.instantiate(prefab)
            }   
            nodeParent.addChild(newNode)
            return newNode
      }

      // 销毁节点
      pubBackPool(that,node){
            let poolName = node.name + 'Pool'
            that[poolName].put(node)
      }

      // 清空缓存池

      clearAllPool(){

            this.v.commonState.poolObj.forEach((value,index,array)=>{

                    value.clear()
            })

      }

}
