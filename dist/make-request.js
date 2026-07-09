"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_request = void 0;
async function make_request(reqFn, path, method, op) {
    try {
        if (op) {
            const res = await reqFn(path, {
                method,
                ...op
            });
            return res;
        }
        const res = await reqFn(path);
        return res;
    }
    catch (error) {
        console.log(error);
        // TODO: better error description
        throw new Error('Eventbrite Error: ' + JSON.stringify(error.parsedError));
    }
}
exports.make_request = make_request;
//# sourceMappingURL=make-request.js.map