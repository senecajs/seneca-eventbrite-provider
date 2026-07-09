"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perform_tasks = void 0;
const _ = __importStar(require("lodash"));
function perform_tasks(tasks, context) {
    tasks.forEach(task => {
        const tasks = _.omit(task, ['on', 'field']);
        for (const [type, data] of Object.entries(tasks)) {
            const taskFn = tasksTypes[type];
            if (!taskFn) {
                throw new Error('unable to find task of type ' + type);
            }
            taskFn(task, context);
        }
    });
    return context;
}
exports.perform_tasks = perform_tasks;
function set(task, context) {
    const source_name = Object.keys(task.set)[0];
    if (!source_name) {
        throw new Error('A source object is required when setting a target');
    }
    const target = context[task.on];
    const target_field = task.field;
    const source = context[source_name];
    const source_field = task.set[source_name];
    target[target_field] = source[source_field];
}
function del(task, context) {
    let target = context[task.on];
    const field = task.del;
    context[task.on] = _.omit(target, [field]);
}
const tasksTypes = {
    set,
    del
};
//# sourceMappingURL=utils.js.map