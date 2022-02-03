import { EntityMap } from "./types";

const entities: EntityMap = {
  event: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/events/:event_id/",
        },
        before: []
      }
    },    
  }
}

export { entities }