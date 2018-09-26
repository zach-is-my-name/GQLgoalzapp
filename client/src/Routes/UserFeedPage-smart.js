/* eslint-disable */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import * as actions from '../Actions/actions'
import CurrentUser from '../Components/User/CurrentUser'
import GlobalFeedPage from './GlobalFeedPage'
import '../style/UserFeedPage.css'
import CurrentGoal from '../Components/Goal/CurrentGoal-smart'
import CurrentSteps from '../Components/Steps/CurrentSteps-smart'
import Notifications from '../Components/Feed/Notifications-smart'
import TargetUser from '../Components/User/TargetUser'
import SelectGoal from '../Components/Goal/SelectGoal-smart'
import InputGoalSmart from '../Components/Goal/InputGoal-smart'

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
    // this.props.dispatch(actions.setTargetUserID(match.params.userid))
  }

  render() {
    const {match} = this.props;
    const {loading, error, User} = this.props.targetUserQuery
    // this.dispatchtargetUserID(match.params.userid)
    if (loading) {
      return (<div>
        Loading..
      </div>)
    }
    return (<div className="userfeedpage-container">
      <h2>
        UserFeed
      </h2>
      <TargetUser targetUserName={User.userName || ''}/>
      <SelectGoal userId={this.props.userQuery.user.id} setGoalDocId={this._setGoalDocId}/> {/* <InputGoal /> */}
      {
        this.state.goalDocId
          ? <CurrentSteps loggedInUser={this.props.userQuery.user.id} targetUser={User.id} goalDocId={this.state.goalDocId}/>
          : null
      }
      {/* <CurrentGoal id={this.props.currentGoalID}/> */}

      {/* <Route exact path={`${match.url}/userfeed/:userid`} component={UserFeedPage} /> */}

      <Notifications/> {/* <CurrentStepsSmart loggedInUserId={this.props.data.user.id || ""} targetUserId={match.params.userid}  /> */}
      <Link className="globalfeed" to="/">
        GlobalFeed
      </Link>
    </div>)
  }

  _setGoalDocId(id) {
    this.setState({goalDocId: id})
  }
}

export default compose(graphql(userQuery, {name: 'userQuery'}), graphql(targetUserQuery, {
  name: 'targetUserQuery',
  options: (ownProps) => {
    return ({
      variables: {
        targetUser: ownProps.userQuery.user.id
      }
    })
  }
}))(UserFeedPage)
