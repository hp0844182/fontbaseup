/**
 * 
 * 函數柯里化
 */
// 例子①：
function curry(func) {
    var args = [];
    return function fn() {
        var argArr = [].slice.call(arguments)
        if (arguments.length > 0) {
            args = args.concat(argArr);
            return fn;
        } else {
            const val = func.apply(null, args)
            args = []
            return val;
        }
    }
}
var add = curry(function() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
});

// 例子②