/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../../Actions/actions'
// import '../../style/SuggestStep.css'

class SuggestStep extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this._submitSuggestedStep = this._submitSuggestedStep.bind(this)
    this.state = {
      step: " "
    }
  }

  _submitSuggestedStep(event) {
    event.preventDefault()

    const {step} = this.state
    const goalDocId = this.props.currentGoalID
    const suggesterId = this.props.loggedInUserID
    const index = this.props.index
    // this.props.dispatch(actions.setSuggestedStep(step, index))
    this.props.submitSuggestedStep({
      variables: {
        suggestedStep: true,
        step,
        index,
        goalDocId,
        suggesterId,
      }
    }).then(({data}) => {
      console.log('DATA SUBMITTED', data);
      this.props.dispatch(actions.setSuggestedStep(step, index, data.createClonedStep.id))
      this.props.dispatch(actions.setPositionIndex())
      // this.props.currentGoalStepsClone.map((stepObj) => {
      //   console.log('stepObj', stepObj)
    // return  this.props.submitPositionUpdate({
    //     variables: {
    //       goalDocId: goalDocId,
    //       step: stepObj.step,
    //       suggestedStep: stepObj.suggestedStep,
    //       positionIndex: stepObj.positionIndex,
    //     }
    //   })
      })
      // this.setState({step: ""})
    // })
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }

  render() {
    // if (this.props.data.loading) {
    //   return (<div>Loading</div>)
    // }
    // if (!this.props.data.user) {
    //   console.log('Bad User!')
    //   return (<Redirect to ={{
    //     pathname: '/'
    //   }}/>)
    // console.log('currentGoalStepsClone', this.props.currentGoalStepsClone)
      if (this.props.loggedInUserID !== this.props.targetUserID) {
        return (
          <div className="suggest-step-input">
            <form onSubmit={this._submitSuggestedStep}>
              <input type="text" onChange={this.handleChange} placeholder="" value={this.state.step}/>
              <input className="suggest-step-button" type="submit" value="Suggest Step"/>
            </form>
          </div>
        )
      } else {
        console.log('Not a foreign user!')
        return null
      }
    }
  }

const userQuery = gql `
  query userQuery {
    user {
      id
    }
  }
`
const suggestStepMutation = gql `mutation ($index: Int!, $step: String!, $suggestedStep: Boolean!, $goalDocId: ID, $suggesterId: ID) {
  createClonedStep(
    positionIndex: $index,
    step: $step,
    suggestedStep: $suggestedStep,
    goalDocId: $goalDocId,
    suggesterId: $suggesterId)
    {
    step,
    positionIndex,
    id
  }
}`

const submitPositionUpdate = gql `mutation($goalDocId:ID!,
$step: String!, $positionIndex: Int!, $suggestedStep: Boolean! )
 {
  updateGoalDoc(
    id: $goalDocId,
    clonedSteps: [{
    step: $step,
    suggestedStep: $suggestedStep,
    positionIndex: $positionIndex
    }]
    )
    {
    id,
  }
}`
// const submitPositionUpdate = gql `mutation($goalDocId:ID!, $clonedSteps: [GoalDocclonedStepsClonedStep!],
// $step: String!, $positionIndex: Int!, $suggestedStep: Boolean!)
//  {
//   updateGoalDoc(
//       id: $goalDocId,
//       clonedSteps: $clonedSteps
//     )
//     {
//     id,
//   }
// }`

const SuggestStepWithMutation = compose(

  graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
}),
graphql(suggestStepMutation,
{name: 'submitSuggestedStep'},
  {
  props: ({mutate}) => ({
    submitSuggestedStep({variables}) {
      return mutate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}),
graphql(submitPositionUpdate,
  {name:'submitPositionUpdate'}, {
  props: ({mutate}) => ({
    submitPositionUpdate({variables}) {
      return mutate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}))(withRouter(SuggestStep))

const mapStateToProps = (state, props) => {
  return {loggedInUserID: state.goals.loggedInUserID, targetUserID: state.goals.targetUserID, currentGoalID: state.goals.currentGoalID, currentGoalStepsClone: state.goals.currentGoalStepsClone,
  goalDocID: state.goals.currentGoalID}
}

export default connect(mapStateToProps)(SuggestStepWithMutation);
