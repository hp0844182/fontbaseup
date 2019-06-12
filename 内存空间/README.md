## 三种存储结构（堆、栈、队列）

### 栈数据结构：

![Image text](https://upload-images.jianshu.io/upload_images/599584-b12fef30803a0c53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700/format/webp)

### 堆数据结构：

堆数据结构是一种完全二叉树结构。它在 js 存取数据的方式，可以简单理解为一直 key-value 寻值。

### 队列数据结构:

![队列](https://upload-images.jianshu.io/upload_images/599584-7ca4b641daf48c57.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

数据结构说完之后接下来说下 js 中的数据类型

## 基础数据类型和引用数据类型

### 基础数据类型

number、string、boolean、undefined、null

### 引用数据类型

array、object 等

## 基础数据类型存储在栈内存、引用数据存储在堆内存中

```
  var a = 1;
  var b = {
      a:1
  }
```

这里我们定义了变量 a,b。而变量 a、b 是如何存储的呢？

他们都是存储在栈内存中，不同的是基础数据类型存储的是实际的值，而引用类型变量存储的是指向其真实值的指针，其真实值存放在堆内存中.

![aa](https://s2.ax1x.com/2019/06/12/VRr3qK.png)

如果理解了上面的变量存储，那么接下来下面这个例子就很好理解了。

```
  var a = 2;
  var c = {a:1};
  var b = a;
  b = 3;
  var d = c;
  c.a = 2;
  console.log(a,b,c,d); // 打印的啥？
```

打印结果为：2 3 {a: 2} {a: 2};
![](https://s2.ax1x.com/2019/06/12/VRyODx.png)

## 内存空间管理
js垃圾自动回收
回收的是什么？ 回收的就是js环境中变量所占用的内存。

而其垃圾回收的机制是什么呢？

javascript高级程序编程是这样所的。

垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方
式）。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记
的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器
完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。

这里的环境和我们将的上下文相关。等我们讲完下面的再回过来解答下这个。
