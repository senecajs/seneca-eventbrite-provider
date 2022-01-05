import { Sdk } from 'eventbrite/lib/types'

type Eventbrite = Sdk

type InitalCommandsArgs = {
  eventbrite: Eventbrite
  ZONE_BASE: string
}

export type {
  Eventbrite,
  InitalCommandsArgs,
}
