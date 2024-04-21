
function defineReactive(vm, key, val) {
  var dep = new Dep();//收集依赖
  // {
  //   text:"hello world"
  // }
  // vm.text="hello world"
  Object.defineProperty(vm, key, {

    //get 必须要有数据获取的时候才出发
    get: function () {
      if (Dep.target) {
        // JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
        dep.addSub(Dep.target);
      }
      return val;
    },

    //必须要有数据改变的时候才触发
    set: function (newVal) {
      if (newVal === val) return;
      val = newVal;
      // 作为发布者发出通知
      dep.notify();
    }
  })
}



/**
 * text: 'hello world'
 * vm 实例
 */
function observe(obj, vm) {
  Object.keys(obj).forEach(function (key) {
    //KEY ==text
    defineReactive(vm, key, obj[key]);
  })
}