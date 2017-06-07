import React, {Component} from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'

export class LoginAuth0 extends Component {

  constructor(props) {
    super(props)
    this._lock = new Auth0Lock(props.clientId, props.domain)
    this.state = {
      username: ""
    }
  }

setUserName = () => {
  const userName = prompt("Please Enter a UserName");
  if (userName === null || userName === "") {
    return
  } else {
    this.setState({username: userName})
  }
}




  componentDidMount() {
    this._lock.on('authenticated', (authResult) => {
       window.localStorage.setItem('auth0IdToken', authResult.idToken)
        console.log(window.localStorage)
        const token =  window.localStorage.getItem('auth0IdToken')
      console.log(token  ? 'TOKEN IN LOCALSTORAGE === TRUE': 'TOKEN IN LOCALSTORAGE === FALSE')

      //check if user exists in db
    if (this.props.data.user || window.localStorage.getItem('auth0IdToken') === null) {

        console.log(this.props.data.user ? 'USER QUERY TRUE'  : 'USER QUERY FALSE'
        )
        // console.warn('not a new user or already logged in')
        return
      } else {
        // console.log('TOKEN IN LOCALSTORAGE? :TRUE')
        // console.log('THIS.PROPS.DATA.USER? : TRUE ')
      console.log('GREAT SUCCCES', this.props.data.user, token)
        return
      }

        // this.setUserName()
        console.log('HAVE TOKEN?:', token ? 'TRUE': 'FALSE')
        this.props.createUser(token, this.state.username)
        .then((response) => {
                  console.log(response);
                  // this.props.history.replace('/')
              }).catch((e) => {
                console.error(e)
                // this.props.history.replace('/')
              })
        })}

    _showLogin = () => {
      this._lock.show()
    }


  render() {
    if (!this.props.data.loading && this.props.data.error) {
      console.error(this.props.data.error)
    }
    return (
      <div>
        <button onClick={this._showLogin}>
          Login
        </button>
      </div>
    )
}}



const  createUserMutation = gql`mutation($idToken: String!, $userName: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } },
      userName: $userName){
      id
    }
  }`

  const userQuery = gql`
    query user{
      user {
        id
      }
    }
  `
export default graphql(createUserMutation,
{ props: ({mutate}) => ({
  createUser(idToken, userName) {
    return mutate({
      variables: {idToken , userName}
    })
  }
})
},
{name: 'createUser'},
)(
  graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(LoginAuth0)))
