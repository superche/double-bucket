"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var double_checker_1 = require("./double-checker");
var DoubleBucket = /** @class */ (function () {
    function DoubleBucket(singleCb, doubleCb, options) {
        if (options === void 0) { options = {}; }
        this.wrap = this.innerWrap.bind(this);
        var _a = options.debounceTimeMs, debounceTimeMs = _a === void 0 ? 300 : _a;
        this.checker = new double_checker_1.DoubleChecker(debounceTimeMs);
        this.singleCb = singleCb;
        this.doubleCb = doubleCb;
    }
    DoubleBucket.prototype.innerWrap = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isDouble = this.checker.emit();
        this.singleCb.apply(null, args);
        if (isDouble) {
            this.doubleCb.apply(null, args);
        }
    };
    return DoubleBucket;
}());
exports.default = DoubleBucket;
