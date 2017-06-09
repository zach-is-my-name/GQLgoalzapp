import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'

class CreateUser extends React.Component {
  state = {
    userName: '',
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (this.props.data.user || window.localStorage.getItem('auth0IdToken') === null) {
      console.warn('not a new user or already logged in')
      return (
        <Redirect to={{
          pathname: '/'
        }}/>
      )
    }

return (
  <input
    value={this.state.userName}
    placeholder='Name'
    onChange={(e) => this.setState({name: e.target.value})}
  />
{this.state.name &&
            <button onClick={this.createUser}>Sign up</button>
          }
        )
      }

  createUser = () => {
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken'),
      name: this.state.UserName,
    }

    this.props.createUser({ variables })
      .then((response) => {
          this.props.history.replace('/')
      }).catch((e) => {
        console.error(e)
        this.props.history.replace('/')
      })
  }
}

const createUser = gql`
  mutation ($idToken: String!, $userName: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, userName: $userName)  {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(CreateUser))
)
