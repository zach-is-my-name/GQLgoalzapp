/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../../Actions/actions'
import '../../style/AddStep.css'

const UpdateOrCreateStep = gql `
mutation ($goalDocId:ID, $step: String!, $id: ID!, $positionIndex: Int, $suggestedStep: Boolean) {
  updateOrCreateStep(create: {goalDocId: $goalDocId,
  step: $step, positionIndex: $positionIndex, suggestedStep: $suggestedStep, }, update: {goalDocId: $goalDocId,
  positionIndex: $positionIndex, id: $id})
  {
   step
   id
   goalDoc {
     id
   }
  }
}
  `


// goalDoc: {steps: {step: $step}}

// const StepIdQuery = gql `
// query($id:ID){
//   allSteps(
//     filter:{goalDoc:{id:$id}}
//   )
//  {
//  id
//  originalId
// }}`


// const userQuery = gql`
//   query userQuery {
//     user {
//       id
//     }
//   }
// `

class AddStep extends React.Component {
  constructor(props) {
    super(props)
    this._submitStep = this._submitStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      step: ''
    }
  }

  render() {
    // if (!this.props.data.user) {console.warn('only logged in users can create new posts')}

    if (this.props.loggedInUserID === this.props.targetUserID) {
      return (<div className="stepinput-form">
        <form onSubmit={this._submitStep}>
          <input type="text" onChange={this.handleChange} placeholder="" value={this.state.step}/>
          <input type="submit" value="Submit Step"/>
        </form>
      </div>)
    }
    return (null)
  }


  _submitStep(event) {
    event.preventDefault()
    // this.setState({step: ''})
    this.props.dispatch(actions.setStep(this.state.step))
    this.props.dispatch(actions.setStepPositionIndex())
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps > props", nextProps.currentGoalSteps.length > this.props.currentGoalSteps.length)

    // if (!nextProps.data.loading) {
      // let serverStepIds = nextProps.data.allSteps
    if (nextProps.currentGoalSteps.length > this.props.currentGoalSteps.length) {
       nextProps.currentGoalSteps.map(stepObj => {
        let id
        if (!stepObj.id) {
        id = "x"
      } else {
        id = stepObj.id
      }
         return this.props.updateOrCreateStep({
           variables: {
             goalDocId: this.props.goalDocID,
             step: stepObj.step,
             id: id,
             positionIndex: stepObj.positionIndex,
             suggestedStep: false
           }
         })
      // this.props.createStep({
      //   variables: {
      //     step: this.state.step,
      //     goalDocId,
      //     positionIndex: this.props.index,
      //     suggestedStep: false
      //   }
      // })
      .then(({data}) => {
        console.log('DATA SUBMITTED', data);
      })
    })
    } else {
      alert("Select a Goal to Enter a Step on")
      }
  // }
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }
}

const AddStepWithApollo =
compose(
graphql(UpdateOrCreateStep, {
  props: ({mutate}) => ({
    updateOrCreateStep({variables}) {
      return mutate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }
  })
}),
// graphql(StepIdQuery, {
//   options: ({goalDocID}) => ({
//     variables: {
//       id: goalDocID
//     }
//   })
// })
)(withRouter(AddStep))




const mapStateToProps = (state, props) => {
  return {currentGoal: state.goals.currentGoal, currentGoalID: state.goals.currentGoalID, loggedInUserID: state.goals.loggedInUserID, targetUserID: state.goals.targetUserID, currentGoalSteps: state.goals.currentGoalSteps, goalDocID: state.goals.currentGoalID}
}

export default connect(mapStateToProps)(AddStepWithApollo)
