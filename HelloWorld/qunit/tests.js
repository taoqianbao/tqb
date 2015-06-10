/**
 * Created by peter on 2015-06-10.
 */

QUnit.test("hello test assert Ok", function (assert) {

    assert.ok(1 == "1", "Passed!");
    assert.ok(true, "true succeeds");
    assert.ok("non-empty", "non-empty string succeeds");
    assert.ok(false, "false fails");
    assert.ok(0, "0 fails");
    assert.ok(NaN, "NaN fails");
    assert.ok("", "empty string fails");
    assert.ok(null, "null fails");
    assert.ok(undefined, "undefined fails");
});

QUnit.test("hello test assert equal", function (assert) {

    assert.equal(0, 0, "Zero, Zero; equal succeeds");
    assert.equal("", 0, "Empty, Zero; equal succeeds");
    assert.equal("", "", "Empty, Empty; equal succeeds");
    assert.equal(0, false, "Zero, false; equal succeeds");
    assert.equal("three", 3, "Three, 3; equal fails");
    assert.equal(null, false, "null, false; equal fails");

    assert.strictEqual(1, 1, "1=1");

});

QUnit.test("deepEqual test", function (assert) {
    var obj = {foo: "bar"};
    assert.deepEqual(obj, {foo: "bar"}, "Two objects can be the same in value");
});


/*
 * Synchronous Callbacks ͬ���ص�
 * */
QUnit.test("a test", function (assert) {

    expect(2);

    function calc(x, operation) {
        return operation(x);
    }

    var result = calc(2, function (x) {
        assert.ok(true, "calc() calls operation function");
        return x * x;
    });
    assert.equal(result, 4, "2 square equals 4");
});

QUnit.test("expert test", function (assert) {

    expect(1);

    var $body = $("body");

    $body.on("click", function () {
        assert.ok(true, "body was clicked!");
    });

    $body.trigger("click");
});

/*
 * Asynchronous Callbacks �첽�ص�
 * */
QUnit.asyncTest("asynchronous test: one second later!", function (assert) {

    expect(1);

    setTimeout(function () {

        assert.ok(true, "Passed and ready to resume!");

        QUnit.start();

    }, 1000);

});


function KeyLogger(target) {
    if (!(this instanceof KeyLogger)) {
        return new KeyLogger(target);
    }
    this.target = target;
    this.log = [];
    var self = this;
    this.target.off("keydown").on("keydown", function (event) {
        self.log.push(event.keyCode);
    });

}

QUnit.test("keylogger api behavior", function (assert) {
    var event,
        $doc = $(document),
        keys = KeyLogger($doc);

// trigger event
    event = $.Event("keydown");
    event.keyCode = 9;
    $doc.trigger(event);

// verify expected behavior
    assert.equal(keys.log.length, 1, "a key was logged");
    assert.equal(keys.log[0], 9, "correct key was logged");
});

