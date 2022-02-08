import { EntityMap } from "./types";

const entities: EntityMap = {
  event: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/events/:event_id/",
        },
        after: [
          { on: 'outent', field: 'event_id', set: { query: 'event_id' } }
        ]
      },
      save: {
        request: {
          method: "post",
          path: "/events/:event_id/",
          body: {
            event: [
              'name',
              'description', 
              'start', 
              'end', 
              'currency',
              'online_event',
              'organizer_id',
              'listed',
              'shareable', 
              'invite_only', 
              'show_remaining',
              'password',
              'capacity',
              'is_reserved_seating',
              'is_series', 
              'show_pick_a_seat',
              'show_seatmap_thumbnail',
              'show_colors_in_seatmap_thumbnail',
            ]
          },
        },
        before: [
          { on: 'req', del: 'event.start.local' },
          { on: 'req', del: 'event.end.local' },
          { on: 'req', del: 'event.name.text' },
          { on: 'req', del: 'event.description.text' },
        ]
      }
    },    
  }
}

export { entities }