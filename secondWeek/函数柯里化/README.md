# 函数柯里化
>函数柯里化，可以理解为提前接受部分参数，延迟执行，不立即输出结果，而是返回一个接受剩余参数的函数。

## 我们以add(1)(2)(3) == 6 这么一个加法函数为例，用函数柯里化来实现它。
> 首先我們编写一个加法函数
```
    // 加法函数
    function add(){
        var sum = 0;
        for(var i = 0; i < arguments.length; i++){
            sum += arguments[i];
        }
        return sum;
    }
```
> 然后我们编写一个柯里化函数
```
// 柯里化函数工厂函数
// @func 需要进行柯里化的函数
    function curry(func){
        // args数组存储参数
        var args = []
        return function fn(){
            // argArr存储当前传入参数
            var argArr = [].slice.call(arguments);
            // 传入参数时先将参数存储
            if(arguments.length >0){
                args = args.concat(argArr);
                return fn;
            }else{
                // 没有传参数时，将之前参数合并运行函数
                const val = func.apply(null,args)
                // 重置参数
                args = []
                return val;
            }
        }
    }
```
> 现在我们就可以以add(1)(2)(3)()的形式来求多数之和了。

> 上面这种形式只求了最终1+2+3的值，如果我想1+2的值也记录下来可以么？
```
    function currying(fn){
    var allArgs = [];

    function next(){
        if(arguments.length===0){
            var allArgsBak = allArgs;
            allArgs = [];
            return fn.apply(null,allArgsBak)
        }
        var args = [].slice.call(arguments);
        allArgs = allArgs.concat(args);
        return next;
    }
    // 字符类型
    next.toString = function(){
        return fn.apply(null, allArgs);
    };
    // 数值类型
    next.valueOf = function(){
        return fn.apply(null, allArgs);
    }

    return next;
}
var add = currying(function(){
    var sum = 0;
    for(var i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
});

```
>答案是可以的，实现这个的话就需要提一下js中的valueOf、tostring方法：
js在运算和比较的时候会隐式的调用valueOf、toString方法。

>根据这个特性我们可以对上面方法进行改造
```
    function curry(func){
        var funcBak = func
        return function fn(){
            // 传入参数進行綁定
            if(arguments.length >0){
                funcBak = funcBak.bind(null,...arguments)
                return fn;
            }else{
                return funcBak();
            }
        }
    }
```
## valueOf 和 toString
> 这两个方法在JS中除了undefined和null之外基本都具有这个方法。这两个方法有什么作用呢？当JS中对变量进行运算或者比较时会隐形的调用这两个方法。

> 举个例子
```
    var obj = {
        val:10,
        valueOf:function(){
            console.log("valueOf");
            return this.val;
        },
        toString:function(){
            consoel.log("toString");
            return this.val;
        }
    }
    alert(obj); //toString
    alert(+obj);//valueOf
    alert(""+obj);//valueOf
    alert(String(obj));//toString
    alert(Number(obj));//valueOf
    alert(obj == 10);//valueOf
    alert(obj == {});//都不调用
    alert(obj === 10);//都不调用
```

> 乍一看结果，大抵给人的感觉是，如果转换为字符串时调用toString方法，如果是转换为数值时则调用valueOf方法，但其中有两个很不和谐。一个是alert(''+obj)，字符串合拼应该是调用toString方法，再有就是obj == {}，obj === {} 干脆两个都不调用。

> 为了搞明白它的规则，我们需要更多的例子。
```
    var aa = {
    i: 10,
    toString: function() {
        console.log('toString');
        return this.i;
        }
    };

    alert(aa);// 10 toString
    alert(+aa); // 10 toString
    alert(''+aa); // 10 toString
    alert(String(aa)); // 10 toString
    alert(Number(aa)); // 10 toString
    alert(aa == '10'); // true toString
```

> 在上面的这个例子我们发现，当对象只重写toString方法时，所有隐性调用都调用了toString

> 再来一个例子

```
    var aa = {
    i: 10,
    valueOf: function() {
        console.log('valueOf');
        return this.i;
        }
    };

    alert(aa);// 10 valueOf
    alert(+aa); // 10 valueOf
    alert(''+aa); // 10 valueOf
    alert(String(aa)); // 10 valueOf
    alert(Number(aa)); // 10 valueOf
    alert(aa == '10'); // true valueOf
```
> 上面的例子显示当对象只重写valueOf时，该调用valueOf的地方调用ValueOf，但是该调用toString的地方它还是调用了toString。

> 我根据上面的例子做了以下总结：

    ①、当对变量进行alert(变量)、或者字符串转换（String(变量)）时，会隐式调用toString。而当对变量进行运算、比较时会隐式调用valueOf。

    ②、当对象只重写了toString方法时，所有隐式调用都会去调用toString.

    ③、当对象只重写了valueOf方法时候，按①规则该调用toString就调用toString,该调用valueOf就调用valueOf。只不过这个toString是原型链上Object的toString。

    ④、aa == ？,当变量aa与一个基础类型值比较时候，会隐式调用valueOf(当只重写了toString时调用toString)。而当变量aa与一个引用类型进行比较时，此时比较的是两个地址指针，所以不必隐式调用toString、valueOf。

    ⑤ aa ===,当变量aa是用===进行比较时，不会隐式调用toString、valueOf。




