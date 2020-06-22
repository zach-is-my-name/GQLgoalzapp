/* eslint-disable */
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
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

const existingUserQuery = gql `
  query existingUserQuery($urlId: ID) {
    User(id: $urlId) {
    id
    }
  }
`

class UserFeedPage extends Component {
  constructor(props) {
    super(props)
    // this.dispatchtargetUserID = this.dispatchtargetUserID.bind(this)
    this.state = {
      goalDocId: '',
      paramUserId: '',
      suggesters: [],
      suggestersIndex: 0,
      selectedSuggesterId: '',
      selectedSuggesterName: '',
      renderFundGoal: false,
    }

    this._setGoalDocId = this._setGoalDocId.bind(this)
    this._setSelf = this._setSelf.bind(this)
    this._setSuggesters = this._setSuggesters.bind(this)
    this._nextSuggester = this._nextSuggester.bind(this)
    this._prevSuggester = this._prevSuggester.bind(this)
    this._setGoalDocIdOnCreate = this._setGoalDocIdOnCreate.bind(this)
  }

async componentDidMount() {
    const {match} = this.props;
    match.params.goaldocid ? this.props.setUrlHasGoalDoc() : null
    !match.params.goaldocid ? this.props.setUrlDoesNotHaveGoalDoc() : null
    match.params.goaldocid ? this.setState({goalDocId: match.params.goaldocid}) : null;
    match.params.userid  ? this.setState({paramUserId: match.params.userid}) : null;
    let existingUserId;

    if (!match.params.userid)   {
        this.props.history.push('/')
      }

    if (this.props.userQuery.user && this.props.userQuery.user.id) {
        // console.log(this.props.userQuery.user.id)
        // console.log(this.props.userQuery.user.userName)
        this.setState((state, props) => {
          return ({suggesters: [{userName: props.userQuery.user.userName,
            id: props.userQuery.user.id}, ...state.suggesters]})
        })
    }
}

 componentDidUpdate (prevProps, prevState) {
   if (this.props.match.params.goaldocid !== prevProps.match.params.goaldocid && this.props.match.params.goaldocid) {
     this.props.setUrlHasGoalDoc()
     this.setState({goalDocId: this.props.match.params.goaldocid})
   }
   if (this.props.match.params.goaldocid !== prevProps.match.params.goaldocid && !this.props.match.params.goaldocid) {
    this.props.setUrlDoesNotHaveGoalDoc()
  }
   if (this.state.suggesters !== prevState.suggesters || this.state.suggestersIndex !== prevState.suggestersIndex) {
     this.setState({
       selectedSuggesterId: this.state.suggesters[this.state.suggestersIndex].id,
       selectedSuggesterName: this.state.suggesters[this.state.suggestersIndex].userName})
   }
 }

  render() {
    // console.log(this.props.targetUserQuery)
    const {match} = this.props;
    const {loading, error, User} = this.props.targetUserQuery
    if (loading) {
      return (<div>
        Loading..
      </div>)
    }
    return (
      <div className="userfeedpage-container">


        <div className="userfeed suggester-container">
          <SelectedSuggesterName
            loggedInUserId={this.props.userQuery.user ? this.props.userQuery.user.id : null}
            selectedSuggesterId={this.state.selectedSuggesterId}
            selectedSuggesterName={this.state.selectedSuggesterName}
          />

          <SelectSuggesterSmart
            goalDocId={match.params.goaldocid || this.state.goalDocId}
            setSelf={this._setSelf}
            setSuggesters={this._setSuggesters}
            suggesters={this.state.suggesters}
            nextSuggester={this._nextSuggester}
            prevSuggester={this._prevSuggester}
          />
        </div>

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

        <div className="userfeed footer1 container">
          <TargetUser targetUserName={User.userName || ''}/>

          <SelectGoal
            targetUserId={User.id}
            setGoalDocId={this._setGoalDocId}
            value={this.state.goalDocId || match.params.goaldocid}
            match={match}
            setProxyAddress={this.props.setProxyAddress}
          />
        </div>

        <div className = "userfeed input-goal-container">
        {this.props.targetUserQuery.User.id === this.props.userQuery.user.id && !this.state.goalDocId ?
           <InputGoalSmart
          loggedInUserId = {this.props.userQuery.user.id}
          _setGoalDocIdOnCreate = {this._setGoalDocIdOnCreate}
          proxyAddress={this.state.proxyAddress}
          selectedAccount={window.ethereum.selectedAddress}
          setProxyAddress={this.props.setProxyAddress}
          setUserTokenBalance={this.props.setUserTokenBalance}
          userTokenBalance={this.props.userTokenBalance}
          / >
          : null
        }
        </div>

        <div className="userfeed footer2 container">
          <Link className="globalfeed" to="/">
            <span className="fas faGlobe fa-lg"> <FontAwesomeIcon icon={ faGlobe } /> </span>
          </Link>

        </div>
      </div>
    )
  }
// on change bad goaldocid
  _setGoalDocId(event) {
    event.preventDefault()
    //console.log(event.target.value)
    const goalDoc = JSON.parse(event.target.value)
    //console.log(goalDoc)
    goalDoc.newGoal && goalDoc.newGoal === 'new-goal' ? this.setState({goalDocId: ""}) : this.setState({goalDocId: goalDoc.id})
    goalDoc.proxyAddress ?  this.props.setProxyAddress(goalDoc.proxyAddress) && this.setState({proxyAddress: goalDoc.proxyAddress}) : null
    goalDoc.newGoal === 'new-goal' ? this.props.history.push(`/userfeed/${this.props.match.params.userid}`)  :
    this.props.history.push(`/userfeed/${this.props.match.params.userid}/${goalDoc.id}`)
  }

 _setGoalDocIdOnCreate(id) {
   this.props.history.push(`/userfeed/${this.props.match.params.userid}/${id}`)
 }

 _setSelf() {
      this.setState(prevState=> ({suggestersIndex: 0}))
 }

 _setSuggesters(suggesters) {
   // console.log(suggesters)
   this.setState({suggesters: [...this.state.suggesters, suggesters] })
 }

 _nextSuggester() {
   console.log('suggesters', this.state.suggesters)
   console.log('suggesters index', this.state.suggestersIndex)
  if (this.state.suggesters.length && this.state.suggestersIndex < this.state.suggesters.length -1 && this.state.suggesters[1]) {
    console.log('case1 triggered')
    this.setState(prevState=> ({suggestersIndex: prevState.suggestersIndex + 1}))
  } else if (this.state.suggestersIndex < this.state.suggesters.length) {
      console.log('case2 triggered')
      this.setState(prevState=> ({suggestersIndex: 0}))
  }
  // const selectedSuggesterId = this.state.suggesters[this.state.suggestersIndex].id
  //  this.setState(prevState => ({selectedSuggesterId: x  }))
  //  this.setState({suggesterName: y})
 }

  _prevSuggester() {
    if (this.state.suggesters.length > 0 && this.state.suggesters[1]) {
      if (this.state.suggestersIndex !== 0) {
        this.setState(prevState=> ({suggestersIndex: prevState.suggestersIndex - 1}))
      } else if (this.state.suggestersIndex === 0) {
          this.setState(prevState=> ({suggestersIndex: this.state.suggesters.length -1}))
    }
  }
}
}

export default compose(
graphql(userQuery, {name: 'userQuery'}),
graphql(targetUserQuery, {
  name: 'targetUserQuery',
  options: (ownProps) => {
    // console.log(ownProps.match.params)
    // console.log(ownProps.match.params.userid)
    return ({
      variables: {
        targetUser: ownProps.match.params.userid
      }
    })
  }
}))(UserFeedPage)
