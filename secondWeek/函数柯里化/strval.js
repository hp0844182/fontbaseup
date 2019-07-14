var obj = {
    val: 10,
    valueOf: function() {
        console.log("valueOf");
        return this.val;
    },
    toString: function() {
        console.log("toString");
        return this.val;
    }
}
alert(obj); //toString //展示
alert(+obj); //valueOf // 运算
alert("" + obj); //valueOf //运算

alert(String(obj)); //toString 
alert(Number(obj)); //valueOf
alert(obj == 10); //valueOf //比较
alert(obj == {}); //都不调用 // 比较
alert(obj === 10); //都不调用 // 比较