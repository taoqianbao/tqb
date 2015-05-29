/**
 * Created by peter on 2015/4/21.
 */
(function (win) {
    var str = "Every man in the world! Every woman on earth!";
    console.log("str = ",str);
    document.write(str);
    document.write("<br />");

    var pattern = /man/g;

    var str2 = str.replace(pattern,"person");
    console.log("str2 = ",str);

//RegExp Object Method

    //compile() 方法用于在脚本执行过程中编译正则表达式。
    //compile() 方法也可用于改变和重新编译正则表达式。

    pattern = /(wo)?man/gi;
    pattern.compile(pattern);

    var a = str.replace(pattern,"person");
    console.log("a = ",a);

    //exec() 方法用于检索字符串中的正则表达式的匹配。
    var a1 = pattern.exec(str);
    console.log("a1 = ",a1);

    var result;
    while ((result = pattern.exec(str)) != null)  {
        document.write(result);
        document.write("<br />");
        document.write(pattern.lastIndex);
    }

    //test() 方法用于检测一个字符串是否匹配某个模式.
    var b = pattern.test(str);
    console.log("b = ",b);

    b = pattern.exec(str) != null;
    console.log("b = ",b);

//String Object - support RegExp method

    //search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
    //stringObject 中第一个与 regexp 相匹配的子串的起始位置。
    var d = str.search(pattern);
    console.log("d = ",d);

    //match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
    //存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。
    var e = str.match(pattern);
    console.log("E = ",e);

    //replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
    //返回值    一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。
    var f = str.replace(pattern, ' peter ');
    console.log("f = ",f);

    //split() 方法用于把一个字符串分割成字符串数组。
    //返回值    一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。返回的数组中的字串不包括 separator 自身。
    var g = str.split(pattern);
    console.log("G = ",g);


})(window);