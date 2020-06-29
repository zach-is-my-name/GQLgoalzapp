// import {createNetworkInterface} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

// const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj30pbaza1q9j0141cxyrqrw8', {
//   reconnect: true,
/*  connectionParams: {
    authToken: user.authToken,
  }, */
// })

export const httpLink  = createHttpLink({
  uri: 'https://api.8base.com/ckbx087zh000207ms3ink870q'
})

const middlewareLink = setContext(() => ({
  headers: {
    // authorization: `Bearer ${localStorage.getItem('auth0IdToken')}` || `Bearer ${localStorage.getItem('graphcoolToken')}` || null
    authorization: `Bearer ${localStorage.getItem('auth0IdToken') || localStorage.getItem('graphcoolToken')}` ||  null
  }
}))

export const link = middlewareLink.concat(httpLink)
// const link = middlewareLink.concat(httpLink)
// console.log(link)
// export link
// networkInterface.use([{
//   applyMiddleware (req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {}
//     }
//
//     // get the authentication token from local storage if it exists
//     if (localStorage.getItem('auth0IdToken')) {
//       req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
//       // console.log('Request Headers:', req.options.headers.authorization)
//     }
//     next()
//   },
// }])
