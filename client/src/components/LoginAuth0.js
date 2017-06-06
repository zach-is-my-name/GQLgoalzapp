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
      console.log('IDTOKEN', authResult.idToken)
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      this.setUserName()

      //check if the user exists on the User Model
      if (this.props.data.user || window.localStorage.getItem('auth0IdToken') === null) {
        console.warn('not a new user or already logged in')

      } else {

      // Run create User Mutation
        const token = window.localStorage.getItem('auth0IdToken')

        console.log(typeof token)
        console.log('TOKEN', token)
        this.props.createUser(token, this.state.username)
        .then((response) => {
                  console.log(response);
                  // this.props.history.replace('/')
              }).catch((e) => {
                console.error(e)
                // this.props.history.replace('/')
              })
          }
        }
  )    }




    _showLogin = () => {
      this._lock.show()
    }


  render() {
    return (
      <div>
        <button onClick={this._showLogin}>
          Login
        </button>
      </div>
    )
}
}


const createUserMutation = gql`
  mutation($idToken: String!, $userName: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } },
      userName: $userName){
      id
    }
  }`

  const userQuery = gql`
    query {
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
{name: 'createUser'})(
  graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(LoginAuth0)))
