/* eslint-disable */
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import CurrentUser from '../Components/User/CurrentUser'
import GlobalFeedPage from './GlobalFeedPage'
import CurrentGoal from '../Components/Goal/CurrentGoal-smart'
import CurrentSteps from '../Components/Steps/CurrentSteps-smart'
import Notifications from '../Components/Feed/Notifications-smart'
import TargetUser from '../Components/User/TargetUser'
import SelectGoal from '../Components/Goal/SelectGoal-smart'
import InputGoalSmart from '../Components/Goal/InputGoal-smart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import '../style/UserFeedPage.css'

const userQuery = gql `
  query userQuery {
        user {
          id
          userName
            }
       }`

const targetUserQuery = gql `
  query targetUserQuery($targetUser: ID) {
  User(id:$targetUser) {
    userName
    id
  }
}`

class UserFeedPage extends Component {
  constructor(props) {
    super(props)
    // this.dispatchtargetUserID = this.dispatchtargetUserID.bind(this)
    this.state = {
      goalDocId: ''
    }
    this._setGoalDocId = this._setGoalDocId.bind(this)
  }

  componentDidMount() {
    const {match} = this.props;
  }

  render() {
    const {match} = this.props;
    // console.log(match)
    const {loading, error, User} = this.props.targetUserQuery
    // this.dispatchtargetUserID(match.params.userid)
    if (loading) {
      return (<div>
        Loading..
      </div>)
    }
    return (
      <div className="userfeedpage-container">
        <h2>
          {/* UserFeed */}
        </h2>
        <TargetUser targetUserName={User.userName || ''}/>
        <SelectGoal
          targetUserId={User.id}
          userId={this.props.userQuery.user.id}
          setGoalDocId={this._setGoalDocId}
          value={this.state.goalDocId}
          match={match}
        />
        {/* <InputGoal /> */}
        {
          match.params.goaldocid || this.state.goalDocId
            ? <CurrentSteps
              loggedInUser={this.props.userQuery.user.id}
              targetUser={User.id}
              goalDocId={match.params.goaldocid || this.state.goalDocId}
              />
            : null
        }
        {/* <CurrentGoal id={this.props.currentGoalID}/> */}

        {/* <Route exact path={`${match.url}/userfeed/:userid`} component={UserFeedPage} /> */}

        {/* <Notifications/>  */}
        {/* <CurrentStepsSmart loggedInUserId={this.props.data.user.id || ""} targetUserId={match.params.userid}  /> */}
        <Link className="globalfeed" to="/">
          <span className="fas faGlobe fa-lg"> <FontAwesomeIcon icon={ faGlobe } /> </span>
        </Link>
      </div>
    )
  }

  _setGoalDocId(event) {
    this.setState({goalDocId: event.target.value})
  }
}

export default compose(graphql(userQuery, {name: 'userQuery'}), graphql(targetUserQuery, {
  name: 'targetUserQuery',
  options: (ownProps) => {
    return ({
      variables: {
        targetUser: ownProps.match.params.userid
      }
    })
  }
}))(UserFeedPage)
