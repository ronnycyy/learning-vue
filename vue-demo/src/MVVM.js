

// {
//   el: 'app',
//   data: {
//     text: 'hello world'
//   }
// }

//this=>vm
function Vue(options) {
  this.data = options.data;//{text:'kjjkjkj'}
  var data = this.data;//{text:'kjjkjkj'}
  observe(data, this);//监听 vm    object.defineproperty
  var id = options.el;  //app

  /**
   * 
   *  <div id="app">
        <input type="text" id="a" v-model="text">
        {{text}}
      </div>
   */


  //render(){}

  var dom = new Compile(document.getElementById(id), this);//vm
  // 编译完成后，将dom返回到app中
  document.getElementById(id).appendChild(dom);
}