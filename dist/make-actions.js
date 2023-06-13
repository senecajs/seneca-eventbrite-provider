"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_actions = void 0;
const utils_1 = require("./utils");
function make_actions(action_data) {
    const { req_fn, details } = action_data;
    const { request, after, before } = details;
    const { path } = request;
    async function load(msg) {
        const { q } = msg;
        const context = {
            query: q,
        };
        if (before) {
            (0, utils_1.perform_tasks)(before, context);
        }
        const built_path = build_uri(path, q);
        const res = await req_fn(built_path);
        const outent = this.make$(msg.ent.entity$).data$(res);
        if (after) {
            (0, utils_1.perform_tasks)(after, {
                res,
                outent,
                ...context
            });
        }
        return outent;
    }
    async function save(msg) {
        const { q, ent } = msg;
        let body = {};
        const built_path = build_uri(path, ent);
        if (action_data.details.request.body) {
            body = fill_body(action_data.details.request.body, ent);
        }
        let context = {
            query: q,
            inent: ent,
            req: body
        };
        if (before) {
            context = (0, utils_1.perform_tasks)(before, context);
        }
        const res = await req_fn(built_path, {
            body: JSON.stringify(context.req)
        });
        const outent = this.make$(msg.ent.entity$).data$(res);
        if (after) {
            (0, utils_1.perform_tasks)(after, {
                res,
                outent,
                ...context
            });
        }
        return outent;
    }
    function fill_body(body_specs, entity) {
        let body = {};
        if (Array.isArray(body_specs)) {
            body_specs.forEach(attr => {
                body[attr] = entity[attr];
            });
            return body;
        }
        for (const [key, body_args] of Object.entries(body_specs)) {
            body[key] = {};
            body_args.forEach(attr => {
                body[key][attr] = entity[attr];
            });
        }
        return body;
    }
    function build_uri(str, args) {
        let query = '';
        let [uri_blueprint, query_blueprint] = str.split('?');
        if (query_blueprint) {
            query = build_query(query_blueprint, args);
        }
        const uri = build_path(uri_blueprint, args);
        return query ? uri + '?' + query : uri;
    }
    function build_path(path, args) {
        const placeholders = path
            .split("/")
            .filter(p => p.match(":(.[^/]*)")); // matches against sentences like :foo
        placeholders.forEach(p => {
            var _a;
            const param_name = p.split(":")[1];
            path = path.replace(p, (_a = args[param_name]) !== null && _a !== void 0 ? _a : p);
        });
        return path;
    }
    function build_query(str, args) {
        const params = str.split('&');
        return params.map(p => {
            const param_name = p.split(":")[1];
            if (args[param_name]) {
                return p.replace(':' + param_name, args[param_name]);
            }
        }).filter(x => x !== undefined).join('&');
    }
    return {
        load,
        save
    };
}
exports.make_actions = make_actions;
//# sourceMappingURL=make-actions.js.map