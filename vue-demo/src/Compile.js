/**
 * 
 <div id="app">
        <input type="text" id="a" v-model="text">
        {{text}}
      </div>

      vm
 */
function Compile(node, vm) {
  if (node) {
    this.$frag = this.nodeToFragment(node, vm);
    return this.$frag;
  }
}
Compile.prototype = {

  /**
   * <div id="app">
        <input type="text" id="a" v-model="text">
        {{text}}
      </div>
   */
  nodeToFragment: function (node, vm) {
    var self = this;//pwa,css houdini
    var frag = document.createDocumentFragment();//文档片段==>可以储存dom的
    var child;

    while (child = node.firstChild) {
      //child=<input type="text" id="a" v-model="text">
      //{{text}}
      self.compileElement(child, vm);//对数据转义
      frag.append(child); // 将所有子节点添加到fragment中
    }
    return frag;
  },
  //<input type="text" id="a" v-model="text">
  compileElement: function (node, vm) {
    var reg = /\{\{(.*)\}\}/;
    // {{text}}


    //<input type="text" id="a" v-model="text">
    //节点类型为元素
    if (node.nodeType === 1) {
      var attr = node.attributes;
      // 解析属性
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName == 'v-model') {
          var name = attr[i].nodeValue; // 获取v-model绑定的属性名
          node.addEventListener('input', function (e) {
            // 给相应的data属性赋值，进而触发该属性的set方法
            //再批处理 渲染元素
            //1234
            vm[name] = e.target.value;
          });
          // node.value = vm[name]; // 将data的值赋给该node
          new Watcher(vm, node, name, 'value');
        }
      };
    }

    // {{text}}
    //节点类型为text
    if (node.nodeType === 3) {
      //{{text}}==>nodeValue
      if (reg.test(node.nodeValue)) {
        var name = RegExp.$1; // 获取匹配到的字符串
        //text
        name = name.trim();
        // node.nodeValue = vm[name]; // 将data的值赋给该node

        new Watcher(vm, node, name, 'nodeValue');
      }
    }
  },
}

