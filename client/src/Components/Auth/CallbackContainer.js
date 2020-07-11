import React from 'react';
import { withAuth } from '@8base/react-sdk';
import { Client } from '@8base/api-client';
import gql from 'graphql-tag';

const client = new Client("https://api.8base.com/ckbx087zh000207ms3ink870q");

const userQuery =  gql`
  query {
    user {
      id
      email
      lastName
      firstName
    }
  }
`;

const userSignupMutation = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
    }
  }
`
class CallbackContainer extends React.Component {
  async handleAuthentication({ idToken, email }) {
    /**
     * Auth headers for communicating with the 8base API.
     */
    client.setIdToken(idToken);
    /**
     * Check if user exists in 8base.
     */
    try {
      await client.request(userQuery);
    } catch {
      /**
       * If user doesn't exist, an error will be
       * thrown, which then the new user can be
       * created using the authResult values.
       */
      await client.request(userSignupMutation, {
        user: { email: email },
        authProfileId: process.env.REACT_APP_AUTH_PROFILE_ID,
      });
    }
  }

  async componentDidMount() {
    console.log("CallbackContainerRendered")
    const { auth, history } = this.props;
    /* Get authResult from auth client after redirect */
    const authResult = await auth.authClient.getAuthorizedData();
    /* Identify or create user record using authenticated details */
    await this.handleAuthentication(authResult);
    /* Add the idToken to the auth state */
    auth.authClient.setState({ token: authResult.idToken });
    /* Redirect user to root path */
    history.replace('/');
  }

  render() {
    return <h2>Loading...</h2>;
  }
}
/* withAuth injects 'auth' prop into component */
CallbackContainer = withAuth(CallbackContainer);

export { CallbackContainer };
