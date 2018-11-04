import React from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag';

const userQuery = gql `
  query UserQuery {
    user {
      id
    }
  }
`

const createUser = gql`
  mutation CreateUser ($email: String!, $password: String!, $name: String!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, userName: $name) {
      id
    }
  }
`
const signinUser = gql`
  mutation SignInUser ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`
class CreateUserEmail extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

 _createUser = () => {
    const {email, password, name } = this.state

    this.props.createUser({variables: {email, password, name}})
      .then((response) => {
        this.props.signinUser({variables: {email, password}})
          .then((response) => {
            window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
            this.props.history.push('/')
          }).catch((e) => {
            console.error(e)
            this.props.history.push('/')
          })
      }).catch((e) => {
        console.error(e)
        this.props.history.push('/')
      })
    }

  render() {
    if (this.props.data.loading) {
      return (
        <div>Loading</div>
      )
    }
    // redirect if user is logged in or did not finish Auth0 Lock dialog
    const auth0IdToken = window.localStorage.getItem('auth0IdToken')
    const graphcoolToken = window.localStorage.getItem('graphcoolToken')
    if (auth0IdToken || graphcoolToken ) {
      alert('not a new user or already logged in')
      return (
        <Redirect to={{
          pathname: '/'
        }}/>)
    }

    return (
      <div className='create-user-email-container'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />
          <input
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
        </div>

        {this.state.name && this.state.email && this.state.password &&
          <button  onClick={this._createUser}>Log in</button>
        }
      </div>

        )
        }

  }


// const createUserMutation = gql `
//   mutation($idToken: String!, $userName: String!) {
//     createUser(authProvider: { auth0: { idToken: $idToken } },
//       userName: $userName){
//       id
//     }
//   }`


const withData = compose (
  graphql(createUser, {name: 'createUser'}),
  graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
}),
graphql(signinUser, {name: 'signinUser'})
)(CreateUserEmail)


export default withRouter(withData)
