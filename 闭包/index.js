function A() {
    var a = 1;
    function B() {
        var b = 2;
        function C() {
            console.log(a, b)
        }
        C();
    }
    B();
}

A();


function time() {
    for (var i = 0; i < 5; i++) {
        setTimeout(function () {
            console.log(new Date, i);
        }, 1000);
    }
}

time();
