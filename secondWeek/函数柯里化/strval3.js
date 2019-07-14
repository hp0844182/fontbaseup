var aa = {
    i: 10,
    valueOf: function() {
        console.log('valueOf');
        return this.i;
    }
};

alert(aa); // 10 toString 
alert(+aa); // 10 valueOf
alert('' + aa); // 10 valueOf
alert(String(aa)); // 10 toString
alert(Number(aa)); // 10 valueOf
alert(aa == '10'); // true valueOf