/* Copyright © 2021 Seneca Project Contributors, MIT License. */


const messages = {

  load_event: {
    desc: 'Load an Eventbrite event data into an entity.',
  },

  save_event: {
    desc: 'Update an Eventbrite event data from an entity.',
  },

}

const sections = {}

export default {
  messages,
  sections
}

if ('undefined' !== typeof (module)) {
  module.exports = {
    messages,
    sections
  }
}
