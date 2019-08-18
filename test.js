function add(num) {
    if (num === 1 || num === 0)
        return num;
    return num + add(num - 1)
}

console.log(add(5))