"use strict";
/* Copyright © 2021 Seneca Project Contributors, MIT License. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventbrite_1 = __importDefault(require("eventbrite"));
const entities_1 = require("./entities");
const make_actions_1 = require("./make-actions");
const make_request_1 = require("./make-request");
function EventbriteProvider(options) {
    const seneca = this;
    let API_KEY = '';
    let eventbrite;
    add_actions();
    function add_actions() {
        const ents = prepare_ents(entities_1.entities);
        for (const ent of ents) {
            seneca.message(ent.load.pattern, (make_load(ent) || unknown_cmd));
            seneca.message(ent.save.pattern, (make_save(ent) || unknown_cmd));
        }
    }
    function make_load(ent) {
        if (!ent.load.details)
            return false;
        return (0, make_actions_1.make_actions)(ent.load).load;
    }
    function make_save(ent) {
        if (!ent.save.details)
            return false;
        return (0, make_actions_1.make_actions)(ent.save).save;
    }
    async function unknown_cmd(msg) {
        throw new Error(`undefined action: ${msg.cmd}, entity: ${msg.ent.entity$}`);
    }
    // prepare links replacing placeholders
    function prepare_ents(entities) {
        const ents_datas = [];
        for (const [ent_name, ent_details] of Object.entries(entities)) {
            ent_details.name = ent_name;
            const ent_data = { load: {}, save: {} };
            const common = { zone: 'provider', base: 'eventbrite', role: 'entity', name: ent_name };
            ent_data.load.pattern = { ...common, cmd: 'load' };
            ent_data.save.pattern = { ...common, cmd: 'save' };
            for (const [action_name, details] of Object.entries(ent_details.actions)) {
                Object.assign(ent_data[action_name], {
                    details,
                    req_fn: prepare_req_fn(details.request.method)
                });
            }
            ents_datas.push(ent_data);
        }
        return ents_datas;
    }
    function prepare_req_fn(method) {
        return (path, options) => {
            return (0, make_request_1.make_request)(eventbrite.request, path, method, options);
        };
    }
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