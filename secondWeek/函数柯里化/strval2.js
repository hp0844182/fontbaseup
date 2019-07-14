var aa = {
    i: 10,
    toString: function() {
        console.log('toString');
        return this.i;
    }
};

alert(aa); // 10 toString
alert(+aa); // 10 toString
alert('' + aa); // 10 toString
alert(String(aa)); // 10 toString
alert(Number(aa)); // 10 toString
alert(aa == '10'); // true toString