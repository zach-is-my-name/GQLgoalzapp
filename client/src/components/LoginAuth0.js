import React, {Component} from 'react'
import Auth0Lock from 'auth0-lock'
import {withRouter, Redirect} from 'react-router-dom'
import {graphql, gql} from 'react-apollo'

export class LoginAuth0 extends Component {

  constructor(props) {
    super(props)
    this._lock = new Auth0Lock(props.clientId, props.domain)
    this.state = {
      username: "",
      userExists: false
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
    if (this.state.userExists.false) {
    this.setUserName()
    const token = window.localStorage.getItem('auth0IdToken')
    this.props.createUser(token, this.state.username).then((response) => {
      console.log(response);
      // this.props.history.replace('/')
    }).catch((e) => {
      console.error(e)
      // this.props.history.replace('/')
    })

      }
})}



  _showLogin = () => {
    this._lock.show()
  }

  render() {

    if (!this.props.data.loading && !this.props.data.error &&
      window.localStorage.getItem('auth0IdToken') !== null
    && this.props.data.user)   {
    this.setState({userExists:true})
    }
    return (
      <div>
        <button onClick={this._showLogin}>
          Login
        </button>
      </div>
    )
      console.error(this.props.data.error)

  }
}

const createUserMutation = gql `
  mutation($idToken: String!, $userName: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } },
      userName: $userName){
      id
    }
  }`

const userQuery = gql `
    query {
      user {
        id
      }
    }
  `
export default graphql(createUserMutation, {
  props: ({mutate}) => ({
    createUser(idToken, userName) {
      return mutate({
        variables: {
          idToken,
          userName
        }
      })
    }
  })
}, {name: 'createUser'})(graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
})(withRouter(LoginAuth0)))
