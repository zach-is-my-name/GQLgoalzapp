import React from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom'
import * as actions from '../../Actions/actions'

class SuggestStep extends React.Component {
  constructor(props) {
  super(props)
  this.handleChange = this.handleChange.bind(this)
  this._submitSuggestedStep = this._submitSuggestedStep.bind(this)
  this.state =  {
    suggestedStep: " "
}
}

_submitSuggestedStep(event) {
event.preventDefault()
const {suggestedStep} = this.state
const goalDocId = this.props.currentGoalID
const suggesterId = this.props.loggedInUserID
this.props.submitSuggestedStep({variables: {suggestedStep, goalDocId, suggesterId}})
  .then(({data}) => {
    console.log('DATA SUBMITTED', data);
    this.setState({suggestedStep: ""})
    this.props.dispatch(actions.setSuggestedStep(suggestedStep))
  })
}

  handleChange (e) {
    this.setState({suggestedStep: e.target.value});
}

  render() {
if (this.props.data.loading) {
  return (<div>Loading</div>)
}
if (!this.props.data.user) {
  console.warn('only logged in users can suggest steps')
  return (
    <Redirect to ={{
      pathname: '/'
    }}/>
  )
}
  const input =
  <form onSubmit={this._submitSuggestedStep}>
    <input type="text" onChange={this.handleChange} placeholder=""
      value={this.state.suggestedStep}/>
    <input type="submit" value="Suggest Step"/>
  </form>

if (this.props.loggedInUserID !== this.props.targetUser) {
return (<div> {input} </div>)
  }
return null
}
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`
const suggestStepMutation = gql `mutation($suggestedStep:String!, $goalDocId: ID, $suggesterId:ID) {
  createSuggestedStep(suggestedStep: $suggestedStep, goalDocId:$goalDocId, suggesterId:$suggesterId)
  {id}
}`

const SuggestStepWithMutation = graphql(userQuery,
  {options: {fetchPolicy: 'network-only'}})(graphql(suggestStepMutation, {
    props: ({mutate}) => ({
    submitSuggestedStep({variables}) {
      return mutate({
        variables: {...variables}
      })
      .catch((error) => {
        console.error(error)
      })
    }
  })
})(withRouter(SuggestStep)))

const mapStateToProps = (state,props) => {
  return {loggedInUserID: state.goals.loggedInUserID,
    targetUser: state.goals.targetUser, currentGoalID: state.goals.currentGoalID,
  }
}

export default connect(mapStateToProps)(SuggestStepWithMutation);
