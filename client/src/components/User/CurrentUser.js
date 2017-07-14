/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import {Link} from 'react-router-dom';

/* CLASS DECLARATION */
class CurrentUser extends Component {

  dispatchCurrentUser() {
    this.props.dispatch(setCurrentUserName(User.username))
  }

  /* RENDER METHOD */
  render() {
    if (!this.props.data.loading) {
      const {
        data: {
          loading,
          error,
          User
        }
      } = this.props;
      // const currentUserID = User.userName
    const currentUserID = this.props.currentUserID
    const currentUser = User.userName
      const link = <Link to={`/userfeed/${currentUserID}`}>{currentUser}</Link>
      if (!loading) {
        return (
          <div>
            <p>Logged In As: {User
                ? link
                : null}
            </p>
          </div>
        )
      }
    }
    return null;
  }

}

/* REDUX */
const mapStateToProps = (state, props) => {
  return {currentUserID: state.goals.loggedInUserID}
}

const CurrentUserWithState = connect(mapStateToProps)(CurrentUser);

/* GRAPHQL QUERY */
const CurrentUserName = gql `
query($userId: ID) {
  User (id: $userId)
  {userName
  }
}
`;

const CurrentUserWithData = graphql(CurrentUserName, {
  options: ({currentUserID}) => ({
    variables: {
      userId: currentUserID
    }
  })
})(CurrentUserWithState);

export default connect(mapStateToProps)(CurrentUserWithData);
