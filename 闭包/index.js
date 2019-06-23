function A() {
    var a = 1;
    var cc = 2;

    function B() {
        console.log(a);
    }
    return B;
}
var func = A();
func();