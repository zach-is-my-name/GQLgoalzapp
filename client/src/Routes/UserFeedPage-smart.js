/* eslint-disable */
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import CurrentUser from '../Components/User/CurrentUser'
import GlobalFeedPage from './GlobalFeedPage'
import CurrentGoal from '../Components/Goal/CurrentGoal-smart'
import CurrentStepsSmart from '../Components/Steps/CurrentSteps-smart'
import Notifications from '../Components/Feed/Notifications-smart'
import TargetUser from '../Components/User/TargetUser'
import SelectSuggesterSmart from '../Components/User/SelectSuggester-smart'
import SelectGoal from '../Components/Goal/SelectGoal-smart'
import SelectedSuggesterName from '../Components/User/SelectedSuggesterName'
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
      goalDocId: '',
      suggesters: [],
      suggestersIndex: 0,
      selectedSuggesterId: '',
      selectedSuggesterName: '',

    }
    this._setGoalDocId = this._setGoalDocId.bind(this)
    this._setSelf = this._setSelf.bind(this)
    this._setSuggesters = this._setSuggesters.bind(this)
    this._nextSuggester = this._nextSuggester.bind(this)
    this._prevSuggester = this._prevSuggester.bind(this)
  }

  componentDidMount() {
    // console.log(this.props)
    const {match} = this.props;
    match.params.goaldocid ? this.setState({goalDocId: match.params.goaldocid}) : null
    if (this.props.userQuery.user) {
      this.setState((state, props) => {
        return ({suggesters: [{userName: props.userQuery.user.userName, id: props.userQuery.user.id}, ...state.suggesters]})
        // (state) => console.log(state)
        // () =>  this.setState((state, props) => { return ({selectedSuggesterId: state.suggesters[state.suggestersIndex].id})}
        // )
      })
    } else {
      this.props.history.push('/')
    }

    // match.params.userid ? this.setState(() => ({suggesters: [match.params.userid, ...this.state.suggesters] } ) ) : null
    // this.setState(() => ({: this.state.})
  }

 componentDidUpdate (prevProps, prevState) {
   // console.log('prevProps', prevProps)
   // console.log('this.props', this.props)
   // console.log('Bool', this.props === prevProps)
   // console.log(this.state)
   // if (this.props !== prevProps) {

   if (this.state.suggesters !== prevState.suggesters || this.state.suggestersIndex !== prevState.suggestersIndex) {
     this.setState({selectedSuggesterId: this.state.suggesters[this.state.suggestersIndex].id,
        selectedSuggesterName: this.state.suggesters[this.state.suggestersIndex].userName})
     // this.setState({})
   }
  // console.log(prevState)
 }

  render() {
    const {match} = this.props;
    // console.log(match)
    const {loading, error, User} = this.props.targetUserQuery
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
        {/* <TargetUser targetUserName={User.userName || ''}/> */}
        <SelectSuggesterSmart
          goalDocId={this.state.goalDocId}
          setSelf={this._setSelf}
          setSuggesters={this._setSuggesters}
          suggesters={this.state.suggesters}
          nextSuggester={this._nextSuggester}
          prevSuggester={this._prevSuggester}
        />
        <SelectedSuggesterName selectedSuggesterName={this.state.selectedSuggesterName} />

        <SelectGoal
          targetUserId={User.id}
          setGoalDocId={this._setGoalDocId}
          value={this.state.goalDocId}
          match={match}
        />
        {/* <InputGoal /> */}
        {
          match.params.goaldocid || this.state.goalDocId ?
            <CurrentStepsSmart
              loggedInUserId={this.props.userQuery.user ? this.props.userQuery.user.id : null}
              targetUser={User.id}
              goalDocId={match.params.goaldocid || this.state.goalDocId}
              suggestersIndex={this.state.suggestersIndex}
              selectedSuggesterId={this.state.selectedSuggesterId}
              selectedSuggesterName={this.state.selectedSuggesterName}
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
    event.preventDefault()
  }

 _setSelf() {
      this.setState(prevState=> ({suggestersIndex: 0}))
   this.setState({})
 }

 _setSuggesters(suggesters) {
   console.log(suggesters)
   this.setState({suggesters: [...this.state.suggesters, suggesters] })
 }

 _nextSuggester() {
  if (this.state.suggestersIndex < this.state.suggesters.length -1) {
    this.setState(prevState=> ({suggestersIndex: prevState.suggestersIndex + 1}))
  } else if (this.state.suggestersIndex < this.state.suggesters.length) {
      this.setState(prevState=> ({suggestersIndex: 0}))
  }
  // const selectedSuggesterId = this.state.suggesters[this.state.suggestersIndex].id
  //  this.setState(prevState => ({selectedSuggesterId: x  }))
  //  this.setState({suggesterName: y})
 }

  _prevSuggester() {
    if (this.state.suggestersIndex !== 0) {
      this.setState(prevState=> ({suggestersIndex: prevState.suggestersIndex - 1}))
    } else if (this.state.suggestersIndex === 0) {
        this.setState(prevState=> ({suggestersIndex: this.state.suggesters.length -1}))
  }
  }
}

export default compose(graphql(userQuery, {name: 'userQuery'}),
graphql(targetUserQuery, {
  name: 'targetUserQuery',
  options: (ownProps) => {
    return ({
      variables: {
        targetUser: ownProps.match.params.userid
      }
    })
  }
}))(UserFeedPage)
