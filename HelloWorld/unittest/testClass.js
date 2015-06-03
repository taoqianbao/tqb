/**
 * Created by Peter on 2015/5/31.
 */
var Person = function (name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype = function () {
    show = function () {
        console.log(this.name);
    }
    return {
        A: show
    }
}();

var p = new Person('peter', 12);

p.A();

var BaseCalculator = function () {
    this.decimalDigits = 2;
};
BaseCalculator.prototype = {
    A: function (x, y) {
        return x + y;
    },
    S: function (x, y) {
        return x - y;
    }
};
var Calculator = function () {
    this.tax = 3;
};

//Calculator.prototype = new BaseCalculator();
Calculator.prototype = BaseCalculator.prototype;

var c1 = new Calculator();
var c2 = new Calculator();
console.log(c1.decimalDigits, ++c1.tax, c1.A(1, 1));
console.log(c2.decimalDigits, c2.tax, c2.A(1, 1));


