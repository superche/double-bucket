"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FIRST_TIME_MS_DEFAULT = -1;
var DoubleChecker = /** @class */ (function () {
    function DoubleChecker(debounceTimeMs) {
        this.isDouble = false;
        this.firstTimeMs = FIRST_TIME_MS_DEFAULT;
        this.debounceTimeMs = debounceTimeMs;
        this.reset();
    }
    DoubleChecker.prototype.emit = function () {
        if (this.isDouble) {
            // on 3rd emit;
            this.reset();
        }
        if (!this.timeout) {
            this.timeout = setTimeout(this.reset.bind(this), this.debounceTimeMs);
        }
        var currentMs = Date.now();
        if (this.firstTimeMs === FIRST_TIME_MS_DEFAULT) {
            // on 1st emit;
            this.firstTimeMs = currentMs;
            return false;
        }
        if (currentMs - this.firstTimeMs < this.debounceTimeMs) {
            // on 2nd emit;
            this.isDouble = true;
            return true;
        }
        // out of the check window;
        return false;
    };
    DoubleChecker.prototype.reset = function () {
        this.isDouble = false;
        this.firstTimeMs = FIRST_TIME_MS_DEFAULT;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };
    return DoubleChecker;
}());
exports.DoubleChecker = DoubleChecker;
