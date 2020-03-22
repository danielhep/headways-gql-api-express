const knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_URI
})

const { Duration } = require('luxon')
const { createPool, createTypeParserPreset, createIntervalTypeParser } = require('slonik')

const slonik = createPool(
  process.env.DB_URI,
  {
    typeParsers: [
      ...createTypeParserPreset(),
      {
        // Intervals should map to Luxon durations
        name: 'interval',
        parse: (value) => {
          const seconds = createIntervalTypeParser().parse(value)
          return Duration.fromMillis(seconds * 1000).shiftTo('hours', 'minutes', 'seconds', 'milliseconds')
        }
      }
    ]
  })

module.exports.slonik = slonik
module.exports.knex = knex
