"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateWith(origObj, updateObj) {
    let result = origObj;
    for (const key in Object.keys(updateObj)) {
        if (typeof (key) != 'undefined') {
            result[key] = updateObj[key];
        }
    }
    return result;
}
exports.updateWith = updateWith;
//# sourceMappingURL=utils.js.map