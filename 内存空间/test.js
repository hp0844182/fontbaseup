var length = 10;
var fn1 = ()=>console.log(this.length)
var fn2 = function(){
    console.log(this.length);
}
var arr = [fn1,fn2];
fn1();
fn2();
arr[0]();
arr[1]();