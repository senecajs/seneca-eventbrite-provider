"use strict";
/* Copyright © 2021 Seneca Open Source, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
function EventbriteProvider(options) {
    const seneca = this;
    let API_KEY = '';
    // seneca.message('role:entity,cmd:load')
    seneca.prepare(async function () {
        let out = await this.post('sys:provider,get:key,provider:eventbrite,key:api');
        if (out.ok) {
            API_KEY = out.value;
        }
        else {
            this.fail('api-key-missing');
        }
    });
}
// Default options.
const defaults = {};
Object.assign(EventbriteProvider, { defaults });
exports.default = EventbriteProvider;
if ('undefined' !== typeof (module)) {
    module.exports = EventbriteProvider;
}
//# sourceMappingURL=eventbrite-provider.js.map