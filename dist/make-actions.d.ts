import { ActionData } from "./types";
declare function make_actions(action_data: ActionData): {
    load: (this: any, msg: any) => Promise<any>;
    save: (this: any, msg: any) => Promise<any>;
};
export { make_actions };
