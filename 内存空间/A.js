function A() {
    var i = 1;
    var j = 2;
    return function () {
        return i;
    }();
}
