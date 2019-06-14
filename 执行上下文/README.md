# 执行上下文

什么是执行上下文？
在 javascript 中有三种代码运行环境（global code 全局运行环境、Function code 函数运行环境、Eval Code eval 执行代码），而为了表示不同的环境、JavaScript 中便有一个执行上下文的概念来区分不同的运行环境（Execution context）,这些上下文便构成了一个执行上下文栈。

## 全局环境

    JavaScript代码运行起来会首先进入该环境中。

## 函数环境

    当函数被调用时，便进入该函数运行环境。

## eval

     eval执行时进入该环境（不建议使用）

## 接下来看一段代码

![上下文](https://s2.ax1x.com/2019/06/13/Vfhe0J.png)

## 执行上下文调用栈

    在javascript程序运行过程中，一般会产生多个执行上下文。javascript引擎会以栈的形式来管理他们，栈底永远是全局上下文，而栈顶就是当前执行上下文。

## 以之前代码为例，简单解析下 js 引擎管理上下文的过程。

    ①. js代码一执行，首先创建全局上下文。

![全局上下文](https://upload-images.jianshu.io/upload_images/599584-bb2d5907b658c456.png)
全局执行上下文入栈。

②、全局上下文入栈之后、代码开始执行，当执行到 changeColor(),这一句激活函数 changeColor,创建其上下文。接下来就是 changeColor 上下文入栈。

![changeColor入栈](https://upload-images.jianshu.io/upload_images/599584-bbc841d4908c05cb.png)

③、changeColor 上下文入栈之后，开始执行 changeColor 函数中可执行代码。接着我们又遇到了 swapColors()、其激活函数 swapColors 创建其执行上下文。
即 swapColors 上下文入栈。
![swapColor入栈](https://upload-images.jianshu.io/upload_images/599584-8bc0424ffcb2507b.png)

    ④、而在swapColors函数可执行代码中没有其他函数执行的代码，因此swapColors代码执行完毕之后便从栈顶弹出。

![swapColors出栈](https://upload-images.jianshu.io/upload_images/599584-bbc841d4908c05cb.png)

    ⑤、swapColors上下文出栈之后、changeColor上下文便处于栈顶、此时又开始执行changeColor中后面的代码。而函数changeColor后面的代码再也没有函数执行的代码，因此当changeColor代码执行完毕之后，其执行上下文也将从栈顶弹出。

![changeColor上下文出栈](https://upload-images.jianshu.io/upload_images/599584-bb2d5907b658c456.png)

    ⑥、changeColor上下文出栈之后、上下文调用栈便只剩全局上下文。

![整个过程](https://upload-images.jianshu.io/upload_images/599584-58d31e5b80737ca0.png)

### 问：那么什么时候全局上下文啥时候出栈呢？

    当标签页关闭时、即当前进程关闭时退出。

在上面我们使用图裂解析的整个 js 程序上下文运行情况，那么接下来我们往小了看、剖析一下单个上下文他的运行情况。

在开始讲这个之前，先看看下这个代码。
![aa](https://s2.ax1x.com/2019/06/13/Vfv3mn.png)

上面代码执行之后并没有报错。

接下来的执行上下文的讲解会为你解开这个疑问。

## 一个执行上下文的声明周期可分为两个阶段。

### 创建阶段

在这个阶段中、执行上下文会创建变量对象、建立作用域、以及确定 this 的指向。

### 代码执行阶段

创建完成之后、就会开始执行代码。
![上下文声明周期](https://upload-images.jianshu.io/upload_images/599584-391af3aad043c028.png)

### 变量对象

上下文创建过程中，首先会生成一个变量对象，而变量对象的生成又历经以下几个阶段。

1. 建立 arguments 对象、检查当前上下文中的参数，完成参数赋值。
   ![arguments建立](https://s2.ax1x.com/2019/06/13/VhPvGt.png)
2. 检查当前上下文的函数声明，也就是 function 关键字声明的函数。在变量对象中已函数名生成一个属性。如果该属性名已存在，旧值会被新值覆盖。
   ![function](https://s2.ax1x.com/2019/06/13/VhFSYR.png)

3. 检查当前上下文中的变量声明，在变量对象中建立该变量名的属性，并赋值 undefined。如果已存在，则直接跳过。
   ![function](https://s2.ax1x.com/2019/06/13/VhFnfI.png)

变量对象创建过程
![变量对象创建过程](https://upload-images.jianshu.io/upload_images/599584-7d131cfe82a20d37.png)

根据这个规则、理解变量提升就非常简单了。这里我们举一个例子
![demo](https://s2.ax1x.com/2019/06/13/Vhk3gx.png)

根据变量对象创建的规则，上面代码起始可以转换成下面这样
![demo2](https://s2.ax1x.com/2019/06/13/VhkRaQ.png)

### 作用域链

在变量创建完成之后，便会创建上下文的作用域链。

作用域链，是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问。

作用域链其实就是变量寻值的一套规则，即根据标识符应该如何得到其对应的值。

为什么更好的理解作用域链，我们以下面代码为例

```
var a = 20;

function test() {
    var b = a + 10;

    function innerTest() {
        var c = 10;
        return b + c;
    }

    return innerTest();
}

test();
```

执行上面代码之后，当函数调上下文用栈进入到 innerTest 中时，全局、函数 test、函数 innerTest 执行上下文先后被创建，此时 innerTest 执行上下文可如下表示：

```
innerTestEC = {
    VO: {...},  // 变量对象
    scopeChain: [VO(innerTest), VO(test), VO(global)], // 作用域链
}
```

我们可以吧 scopeChain 看做作用域链，当在 innerTest 上下文中根据标识符去获取值时，首先从 VO(innerTest)找，找不到在到 VO(test)直到 VO(global)。

### this 的指向

    this的指向，是在函数调用时创建的，也就是函数上下文创建时被创建。并且要牢记一个规则，谁调用这个函数，这个函数中的this就指向谁。同一个函数由于调用方式的不同，this指向了不一样的对象。

    以下面代码为例：
```
    var a = 10;

    var obj = {
        a: 20
    }

    function fn () {
        console.log(this.a);
    }

    fn(); // 10
    fn.call(obj); // 20
```

除此之外，在函数执行过程中，this一旦被确定，就不可更改了。
```
    var a = 10;
    var obj = {
        a: 20
    }

    function fn () {
        this = obj; // 这句话试图修改this，运行后会报错
        console.log(this.a);
    }

    fn();
```
### 变量对象创建完成之后、执行上下文进入代码执行阶段，而变量对象=》活动对象。
