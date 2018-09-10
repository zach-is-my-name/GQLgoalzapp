/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import {Link} from 'react-router-dom';
import CurrentUserDispatch from './CurrentUserDispatch'

/* CLASS DECLARATION */
class CurrentUser extends Component {
  constructor(props){
    super()
    this.state = {
      _isMounted: false
    }
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
    // this.dispatchCurrentUser(currentUser)

        return (

            <div>
              <CurrentUserDispatch currentUser={currentUser} />
            </div>
          // <div className="user-dropdown">
          //   <button onClick={myFunction} className="dropdown-button"> {currentUser}
          //   </button>
          //   <div id="myFunction" className="dropdown-content">
              // <Link to={`/userfeed/${currentUserID}`}>Logout</Link>
          //   </div>
          // </div>
        )
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
query currentUserNameQuery($userId: ID) {
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
