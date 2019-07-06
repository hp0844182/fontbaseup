var a = 2;
var c = { a: 1 };
var b = a;
b = 3;
var d = c;
c.a = 2;
console.log(a, b, c, d); // 打印的啥？