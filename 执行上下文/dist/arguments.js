var a = 10;

var obj = {
    a: 20,
    func: function fn() {
        console.log(this.a);
    }
}

var func = obj.func;
func();
obj.func();