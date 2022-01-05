import { handle_request } from '../helper'
import { InitalCommandsArgs } from '../types'

function category(args: InitalCommandsArgs) {
  async function load_category(this: any, msg: any) {
    const { id } = msg.q

    const get_category = handle_request(args.eventbrite.request, `/categories/${id}/`)

    const category = await get_category()

    return this.make$(args.ZONE_BASE + 'category').data$(category)
  }
  return {
    load_category,
  }
}

export default category 
