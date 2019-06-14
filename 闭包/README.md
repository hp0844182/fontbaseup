# 闭包(closure)

##  1.什么是闭包？

一个函数A中声明了函数B，并且函数B中有队函数A中变量的引用。当函数B执行时便生成了闭包ClosureA。

## 2.以几个面试题详细解析下闭包。

 ①
 ```
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,? (0,0,0)
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?  (0,1,2)
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,? (0,1,1)
//问:三行a,b,c的输出分别是什么？
```
