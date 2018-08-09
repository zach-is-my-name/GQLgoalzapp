import React, {Component} from 'react'
import Auth0Lock from 'auth0-lock'
import {withRouter} from 'react-router-dom'

 class LoginAuth0 extends Component {

  constructor(props) {
    super(props)
    this._lock = new Auth0Lock(props.clientId, props.domain)
    }

  componentDidMount() {
    // console.log('componentDidMount called in LoginAuth0.js')
    this._lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      console.log('token set')
      console.log('Auth Token Got:', window.localStorage.getItem('auth0IdToken', authResult.idToken))
      this.props.history.push('/signup')})
    }

  _showLogin = () => {
    // console.log('CLICKED LOGIN')
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

export default withRouter(LoginAuth0)
