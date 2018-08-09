/* eslint-disable */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../Actions/actions'

import Goal from '../Components/container/Goal.js'
import Steps from '../Components/container/Steps.js'
import App from '../Components/container/App'
import CurrentUser from '../Components/User/CurrentUser'
import GlobalFeedPage from './GlobalFeedPage'
import '../style/UserFeedPage.css'
import CurrentGoal from '../Components/Goal/CurrentGoal'

 class UserFeedPage extends Component {
   constructor(props){
    super(props)
    // this.dispatchtargetUserID = this.dispatchtargetUserID.bind(this)
   }

componentWillMount(){
    const {match} = this.props;
    this.props.dispatch(actions.setTargetUserID(match.params.userid))
  }

  render() {
  const {match} = this.props;
  // this.dispatchtargetUserID(match.params.userid)

    return (

  <div className="userfeedpage-container">
    <h2> UserFeed </h2>
    <Goal />
    <Steps />
    <CurrentGoal id={this.props.currentGoalID}/>

    {/* <Route exact path={`${match.url}/userfeed/:userid`} component={UserFeedPage} /> */}
    
    <Link className="globalfeed" to="/">
      GlobalFeed
    </Link>
  </div>
)
  }
  }

const mapStateToProps = (state, props) => {
  return {
currentGoalID: state.goals.currentGoalID,
  }
}


const ConnectedUserFeedPage = connect(mapStateToProps)(UserFeedPage)
export default ConnectedUserFeedPage
