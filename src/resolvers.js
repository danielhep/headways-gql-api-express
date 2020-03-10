const { GraphQLDate } = require('graphql-iso-date')

module.exports = {
  Date: GraphQLDate,
  Query: {
    agencies: require('./database/agency').getAgencies,
    agency: require('./database/agency').getAgency,
    feeds: require('./database/feed').getFeeds,
    feed: require('./database/feed').getFeed
  },
  Feed: {
    agencies: require('./database/agency').getAgencies,
    routes: require('./database/route').getRoutes,
    stops: require('./database/stop').getStops,
    stops_json: require('./database/stop').getStopsJson,
    stop: require('./database/stop').getStop
  },
  Agency: {
    routes: require('./database/route').getRoutes,
    stop: require('./database/stop').getStop,
    agency_center: ({ agency_center }) => {
      return {
        lat: agency_center[0],
        long: agency_center[1]
      }
    },
    stops: require('./database/stop').getStops
  },
  Stop: {
    stop_times: require('./database/stop').getStopTimes,
    routes: require('./database/route').getRoutesFromStop
  },
  StopTime: {
    trip: require('./database/stoptime').getTripFromStopTime,
    departure_time_readable: require('./database/stop/utils.js').getTimeFromDuration('departure_time'),
    is_even_hour: ({ departure_time }) => !(departure_time.hours % 2),
    time_since_last_readable: require('./database/stop/utils.js').getTimeFromDuration('time_since_last')
  },
  Trip: {
    route: require('./database/trip').getRouteFromTrip
  }
}