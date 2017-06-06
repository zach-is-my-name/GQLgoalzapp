import { createNetworkInterface } from 'apollo-client'
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

// const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj30pbaza1q9j0141cxyrqrw8', {
//   reconnect: true,
/*  connectionParams: {
    authToken: user.authToken,
  }, */
// })

export const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj3bp9pcdnmfd01470ryt1pyd',
  dataIdFromObject: record => record.id,
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
    }
    next()
  },
}])
