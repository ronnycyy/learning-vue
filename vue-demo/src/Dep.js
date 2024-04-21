function Dep() {
  this.subs = [];//电话本
}
Dep.prototype = {
  //??watcher 
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {

    this.subs.forEach(function (sub) {
      //watcher
      sub.update();
    })
  }
}