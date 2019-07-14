#原型与原型链

## 一、对象的定义
>在ECMAScript-262中，对象被定义为“无序属性的集合，其属性可以包含基本值，对象或者函数”。

    也就是说在JavaScript中对象就是由无序的key-value组成。value可以是基本值、对象、函数。


```
    // person就是一个对象
    var person = {
        name:'张三',
        age:16,
        getName:function(){},
        parent:{}
    }
```
> 创建空对象

```
    // new Object
    var obj = new Object();

    // or {}
    var obj = {};
```
>当我们想要给我们创建的简单对象添加方法时，可以这样表示。
```
    // 可以这样
    var person = {};
    person.name = "TOM";
    person.getName = function() {
        return this.name;
    }

    // 也可以这样
    var person = {
        name: "TOM",
        getName: function() {
            return this.name;
        }
    }
```
>当我们想要访问他的name属性时，可以用如下两种方式访问。
```
    person.name

    // 或者
    person['name']
```
> 当访问的属性名是一个变量时，只能使用person['name']这种形式取值。
```
    var name = 'name';
    person[name]; // √
``` 

二、 工厂模式

>使用上面的方式创建对象很简单，但是在很多时候并不能满足我们的需求。就以person对象为例。假如我们在实际开发中，不仅仅需要一个名字叫做TOM的person对象，同时还需要另外一个名为Jake的person对象，虽然他们有很多相似之处，但是我们不得不重复写两次。
```
    var perTom = {
        name: 'TOM',
        age: 20,
        getName: function() {
            return this.name
        }
    };

    var perJake = {
        name: 'Jake',
        age: 22,
        getName: function() {
            return this.name
        }
    }
```
> 这样显示不合理，当需要创建的对象过多时，就是重复写很多相识代码，造成代码臃肿。

> 而使用工厂模式就可以解决这个问题。工厂相当于给我们提供了一个模型，然后我们通过这个模式去进行复制，需要多少就复制多少。

```
var createPerson = function(name, age) {

    // 声明一个中间对象，该对象就是工厂模式的模子
    var o = new Object();

    // 依次添加我们需要的属性与方法
    o.name = name;
    o.age = age;
    o.getName = function() {
        return this.name;
    }

    return o;
}

// 创建两个实例
var perTom = createPerson('TOM', 20);
var PerJake = createPerson('Jake', 22);
```
> 但是以这种形式创建的实例有一个问题，就是我们无法以下面这种方法去获取对象实例类型。
```
    var obj = {};
    var foo = function() {}

    console.log(obj instanceof Object);  // true
    console.log(foo instanceof Function); // true
```
>因此在工厂模式的基础上，我们需要使用构造函数的方式来解决这个问题。

三、构造函数

> 在JavaScript中,new关键字可以让一个函数变得与众不同。通过下面的例子，我们来下new的奇妙之处。
```
    function demo(){
        console.log(this);
    }
    demo();// window
    new demo(); //demo
```
>显然、new关键字是this指向发生了变化。那么new关键字做了什么呢？
```
    // 首先我们创建一个函数
    var Person = function(name, age) {
        this.name = name;
        this.age = age;
        this.getName = function() {
            return this.name;
        }
    }

    // 创建一个person实例
    var p = new Person('zs',20)
```
> new的过程中，实际上执行了以下步骤
    
    ①、声明一个中间对象。
    ②、将该中间对象的原型指向构造函数的原型。
    ③、将构造函数的this，指向该中间对象。
    ④、返回该中间对象，即返回实例对象。
> 这个过程的伪代码如下：
```
    function Person(name, age) {
            // ①、声明一个中间对象。
            var obj = {}
            // ②、将该中间对象的原型指向构造函数的原型。
            obj.__proto__ = Person.prototype
            // ③、将构造函数的this，指向该中间对象。
            this = obj;
            this.name = name;
            this.age = age;
            this.getName = function() {
                return this.name;
            }
            ④、返回该中间对象，即返回实例对象。
            return obj;
    }
```

四、原型

> 一个函数，都会有一个prototype属性，该属性指向一个对象。这个对象就是该函数的原型。

> 而每一个对象都有一个__proto__属性，该属性指向其构造函数的原型对象prototype。对象通过__proto__就可以访问原型对象prototype的属性。prototype对象上的属性和方法也就成为共有属性和方法。

>下面我们通过一个例子来了解实例、构造函数和原型之间的关系。
```
    // 声明构造函数
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    // 通过prototye属性，将方法挂载到原型对象上
    Person.prototype.getName = function() {
        return this.name;
    }

    var p1 = new Person('tim', 10);
    var p2 = new Person('jak', 22);
    console.log(p1.getName === p2.getName); // true
```
![原型](https://upload-images.jianshu.io/upload_images/599584-2fc7dad23d112791.png)

> 通过图示我们可以看出，构造函数的prototype与所有实例对象的__proto__都指向原型对象。而原型对象的constructor指向构造函数。

>除此之外，还可以从图中看出，在构造函数中，通过this声明的属性与方法称为私有变量与方法，它们被当前被某一个实例对象所独有。而通过原型声明的属性与方法，我们可以称之为共有属性与方法，它们可以被所有的实例对象访问。

> 当我们访问实例对象中的属性或者方法时，会优先访问实例对象自身的属性和方法。

```
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function() {
        console.log('this is constructor.');
    }
}

Person.prototype.getName = function() {
    return this.name;
}

var p1 = new Person('tim', 10);

p1.getName(); // this is constructor.
```
>在这个例子中，我们同时在原型与构造函数中都声明了一个getName函数，运行代码的结果表示原型中的访问并没有被访问。

>我们还可以通过in来判断，一个对象是否拥有某一个属性/方法，无论是该属性/方法存在于实例对象还是原型对象。
```
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.getName = function() {
        return this.name;
    }

    var p1 = new Person('tim', 10);

    console.log('name' in p1); // true
```

## 五、原型链
>我们知道所有的函数都有一个叫做toString的方法。那么这个方法到底是在哪里的呢？

```
    // 声明一个函数
    function add(){
        
    }
```