/* eslint-disable */
import React, {Component} from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'
import * as actions from '../../Actions/actions'


/* CLASS DEFINITION */
 class InputSteps extends React.Component {
  constructor(props) {
    super(props)
    this.submitStep = this.submitStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      step: ''
    }
  }

/* EVENT HANDLER */
  submitStep (event) {
    event.preventDefault()
    const {step} = this.state;
    this.setState({step:''})
    const goalDocId  = this.props.currentGoalID
    console.log('STEP INPUT',step)
    console.log('ID INPUT', goalDocId)
    console.log('TYPE OF ID', typeof goalDocId)
    if(this.props.currentGoalID){
    this.props.createStep({variables: {step, goalDocId}})
        .then(( {data} ) => {
          console.log('DATA SUBMITTED', data);
        /* DISPATCH ACTION */
        console.log('this is step', step)
        this.props.dispatch(actions.setStep(step))
        })
      }
      alert("Select a Goal to Enter a Step on")
    }
  handleChange (e) {
    this.setState({step: e.target.value});
  }

/* RENDER METHOD */
  render() {
    if (this.props.data.loading && !this.props.targetUser) {
      return( <div> Loading </div>)

    if (!this.props.data.user) {
      console.warn('only logged in users can create new posts')

  }}
const input =
<form onSubmit={this.submitStep}>
  <input type="text" onChange={this.handleChange} placeholder=""
    value={this.state.step}/>
  <input type="submit" value="Submit Step"/>
</form>
  if (this.props.loggedInUserID === this.props.targetUserID){
  return (input)
}
  console.log('conditional failed')
  return (null)
  }
}

/* GRAPHQL QUERY */
const StepsMutation = gql                                         `
  mutation($step:String!, $goalDocId: ID) {
  createStep(step:$step, goalDocId:$goalDocId) {
    step
    id
  }
}`

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

const InputStepsWithMutation =graphql(userQuery,
  {options: {fetchPolicy: 'network-only'}})
(graphql(StepsMutation,{
    props:({mutate}) => ({
      createStep({variables}) {
        return mutate({
          variables: {...variables }
        })
        .catch((error) => {
          console.log('there was an error sending the query', error)
        })
      }
    })
})(withRouter(InputSteps)))

/* REDUX */
const mapStateToProps = (state, props) => {
  return {currentGoal: state.goals.currentGoal, currentGoalID: state.goals.currentGoalID, loggedInUserID: state.goals.loggedInUserID,
    targetUserID: state.goals.targetUser,
  }
}

export default connect(mapStateToProps)(InputStepsWithMutation)
