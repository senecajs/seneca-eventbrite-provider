import category from "./entities/category"
import { InitalCommandsArgs } from "./types"

function init_commands(initial_args: InitalCommandsArgs) {
  return {
    category: category(initial_args),
  }
}

export default init_commands
