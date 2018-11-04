/* eslint-disable */
import React, {Component} from 'react'
import Auth0Lock from 'auth0-lock'
import {withRouter} from 'react-router-dom'
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import CreateUserEmail from './User/CreateUserEmail.js'
const userQuery = gql`
  query {
    user {
      id
    }
  }
`
const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`
 class Login extends Component {

  constructor(props) {
    super(props)
    this._lock = new Auth0Lock(props.clientId, props.domain)
    this._handleSubmitEmailLogin = this._handleSubmitEmailLogin.bind(this)
    this.state = {
      createUserEmail: false,
      showEmailLogin: false,
      emailValue: '',
      passwordValue: '',
    }
  }



  componentDidMount() {
    const auth0IdToken = window.localStorage.getItem('auth0IdToken')
    const graphcoolToken = window.localStorage.getItem('graphcoolToken')

    // console.log('componentDidMount called in LoginAuth0.js')
    if (!auth0IdToken  && !graphcoolToken) {
      this._lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken, )
      {auth:{ sso:false }}
      // console.log('token set')
      // console.log('Auth Token Got:', window.localStorage.getItem('auth0IdToken', authResult.idToken))
      this.props.history.push(`/`)
      })
    }
  }

  _showAuth0Login = () => {
    console.log('CLICKED LOGIN')
    this._lock.show()
  }

  _showEmailLogin = () => {
    this.setState(prevState => ({showEmailLogin: !prevState.showEmailLogin}))
  }

  _showCreateUserEmail = () => {
    this.setState(prevState => ({createUserEmail: !prevState.createUserEmail}))
  }

  _handleChangeLoginEmail = (event) => {
    this.setState({
      emailValue: event.target.value
    })
  }

  _handleChangePassword = (event) => {
    this.setState({
    passwordValue: event.target.value
    })
  }

  _handleSubmitEmailLogin() {
    const {email, password} = this.state

    this.props.signinUser({variables: {email, password}})
      .then((response) => {
        window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
        this.props.history.push('/')
      }).catch((e) => {
        console.error(e)
        this.props.history.push('/')
      })
  }

  render() {

    return (
      <div>
        <button onClick={this._showAuth0Login}>
          Login with Google
        </button>

        <button onClick={this._showAuth0Login}>
          Register with Google
        </button>
        <button onClick={this._showEmailLogin}>Login Email</button>
        {this.state.showEmailLogin &&
          <div>
            <form onSubmit={this._handleSubmitEmailLogin}>
              <label>
                email
                <input type="text" value={this.state.emailValue} onChange={this._handleChangeLoginEmail} />
              </label>
              <label>
                password
                <input type="text" value={this.state.passwordValue} onChange={this._handleChangePassword} />
              </label>
              {this.state.emailValue && this.state.passwordValue && <button onClick={this._handleSubmitEmailLogin}>Login</button>}
            </form>
          </div>
        }
        <button onClick={this._showCreateUserEmail}>Register Email</button>
        { this.state.createUserEmail &&
          <div>
            <CreateUserEmail  />
          </div>}
      </div>
            )
  }
}

const WithQueries = compose(
  graphql(signinUser, {name: 'signinUser'}),
  graphql(userQuery, {options: {fetchPolicy: 'network-only'}})
)(Login)
export default withRouter(WithQueries)
