"use strict";
/* Copyright © 2021 Seneca Project Contributors, MIT License. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventbrite_1 = __importDefault(require("eventbrite"));
function EventbriteProvider(options) {
    const seneca = this;
    let API_KEY = '';
    let eventbrite;
    seneca
        .message('role:entity,cmd:load,zone:provider,base:eventbrite,name:event', loadEvent)
        .message('role:entity,cmd:save,zone:provider,base:eventbrite,name:event', saveEvent);
    seneca.prepare(async function () {
        let out = await this.post('sys:provider,get:key,provider:eventbrite,key:api');
        if (out.ok) {
            API_KEY = out.value;
            eventbrite = (0, eventbrite_1.default)({ token: API_KEY });
        }
        else {
            this.fail('api-key-missing');
        }
    });
    async function loadEvent(msg) {
        const q = msg.q;
        const eventID = q.id;
        try {
            const event = await eventbrite.request(`/events/${eventID}`);
            const ent = this.make$('provider/eventbrite/event').data$(event);
            return ent;
        }
        catch (e) {
            // TODO: better error description
            throw new Error('Eventbrite Error: ' + JSON.stringify(e.parsedError));
        }
    }
    async function saveEvent(msg) {
        const ent = msg.ent;
        const eventID = ent.id;
        const body = JSON.stringify({
            event: {
                description: {
                    html: ent.summary,
                },
            },
        });
        // Missing a slash at the end of the URL cause the Fetch API to not handle POST requests correctly.
        const event = await eventbrite.request(`/events/${eventID}/`, {
            method: 'POST',
            body,
        });
        const out = this.make$('provider/eventbrite/event').data$(event);
        console.log('SAVE', out);
        return out;
    }
}
// Default options.
const defaults = {
    // TODO: Enable debug logging
    debug: false
};
Object.assign(EventbriteProvider, { defaults });
exports.default = EventbriteProvider;
if ('undefined' !== typeof (module)) {
    module.exports = EventbriteProvider;
}
//# sourceMappingURL=eventbrite-provider.js.map