const {ccclass,property} = cc._decorator


class state{

         // 对象池
         poolObj = []
         // 游戏分数
         gameScore = 0
         // 暂停状态
         pauseState = false
         // 炸弹数量
         bombAmount = 0

}


@ccclass
export default class testMehtod {
    private static instance: testMehtod;
     common = null;
     commonState:state = new state(); 
     
    private constructor() {

        console.log('testMethod constructor')
    }
  
    public static getInstance() {
      if (!testMehtod.instance) {
        testMehtod.instance = new testMehtod();
      }
  
      return testMehtod.instance;
    }
 
  }



  