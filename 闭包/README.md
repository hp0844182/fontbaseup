# 闭包(closure)

##  1.什么是闭包？

一个函数A中声明了函数B，并且函数B中有队函数A中变量的引用。当函数B执行时便生成了闭包ClosureA。

## 2.几个闭包例子
```
function A(){
    var a = 1;
    function B(){
        console.log(a)
    }
    return B
}
B();
```
 
```
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

```
