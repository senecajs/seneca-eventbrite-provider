/* Copyright © 2021 Seneca Project Contributors, MIT License. */


const docs = {

  loadEvent: {
    desc: 'Load an Eventbrite event data into an entity.',
  },

  saveEvent: {
    desc: 'Update an Eventbrite event data from an entity.',
  },

}

export default docs

if ('undefined' !== typeof (module)) {
  module.exports = docs
}
