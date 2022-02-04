import { EntityMap } from "./types";

const entities: EntityMap = {
  event: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/events/:event_id/",
        },
        before: [
          { on:'query', field: 'attribute', set: { query: 'event_id' } }
        ]
      }
    },    
  }
}

export { entities }