/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../../Actions/actions'
// import '../../style/SuggestStep.css'

const userQuery = gql `
  query userQuery {
    user {
      id
    }
  }
`
const clonedStepIdQuery = gql `
query($id:ID){
  allClonedSteps(
    filter:{goalDoc:{id:$id}}
  )
 {
 id
 originalId
}}`

const _suggestStepMutation = gql `mutation ($positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $goalDocId: ID, $suggesterId: ID) {
  createClonedStep(
    positionIndex: $positionIndex,
    step: $step,
    suggestedStep: $suggestedStep,
    goalDocId: $goalDocId,
    suggesterId: $suggesterId)
    {
    step,
    positionIndex,
    id,
    suggestedStep
  }
}`

const positionUpdateMutation = gql `mutation($id: ID!, $positionIndex: Int)
 {updateClonedStep(id:$id, positionIndex: $positionIndex
) {
   id
   positionIndex
   step
 }}`

class SuggestStep extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this._submitSuggestedStep = this._submitSuggestedStep.bind(this)
    // this.submitSubsequent = this.submitSubsequent.bind(this)
    this.state = {
      step: " ",
    }
  }

  _submitSuggestedStep(event) {
    event.preventDefault()

    this.props.dispatch(actions.setSuggestedStep(this.state.step, this.props.index))
    this.props.dispatch(actions.setClonedStepPositionIndex())
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }

  //use this to get the step you added from dispatch in mapStateToProps
  componentWillReceiveProps(nextProps) {
    const suggesterId = nextProps.loggedInUserID

    if (!nextProps.data.loading) {
      let serverClonedStepIds = nextProps.data.allClonedSteps.map(item => item.id)

      if (nextProps.currentGoalStepsClone.length > this.props.currentGoalStepsClone.length) {
        console.log('%cALL CLONED STEPS', "font-weight: bold", nextProps.data.allClonedSteps)
        console.log('serverClonedStepIds', serverClonedStepIds)
        let serverAndStateIdsMatch
        console.log('currentGoalStepsClone', nextProps.currentGoalStepsClone)

        nextProps.currentGoalStepsClone.map((stepObj, mapIndex, array) => {
          console.log('stepObj ==', stepObj)
            serverAndStateIdsMatch = serverClonedStepIds.filter(idFromServer =>
               idFromServer === stepObj.originalId)

          console.log('serverAndStateIdsMatch', serverAndStateIdsMatch)

            if (serverAndStateIdsMatch && serverAndStateIdsMatch.length) {
            console.log('%c**UPDATE SITUATION**', "color:blue")
            // console.log('%cID MATCHES', "color:purple", serverAndStateIdsMatch)
              return this.props.submitPositionUpdate({
                variables: {
                  id: serverAndStateIdsMatch[0],
                  positionIndex: stepObj.positionIndex
                }
              })
              .then(({data}) => {
                console.log('%cSTEP POSITION UPDATED', "color:green", data)
              })
            } else if (!serverAndStateIdsMatch.length && stepObj.suggestedStep === true) {
            console.log('%c*New Suggested Step* SUBMIT SITUATION ', "color:orange")
            return this.props.submitSuggestedStep({
              variables: {
                suggestedStep: true,
                step: stepObj.step,
                positionIndex: stepObj.positionIndex,
                goalDocId: this.props.goalDocID,
                suggesterId: this.props.loggedInUserID
              }
            }).then(({data}) => {
              console.log('%cNEW STEP SUBMITTED',"color:green", data);
              this.props.dispatch(actions.setClonedStepIdFromServer(mapIndex, data.createClonedStep.id))
            })
            // .then(() => this.props.dispatch(actions.resolveAcceptStep())
        // )
      }

          else if (!serverAndStateIdsMatch.length && stepObj.suggestedStep === false) {
            console.log('%c*Existing step* SUBMIT SITUATION ', "color:orange")
            return this.props.submitSuggestedStep({
              variables: {
                suggestedStep: false,
                step: stepObj.step,
                positionIndex: stepObj.positionIndex,
                goalDocId: this.props.goalDocID,
                suggesterId,

              }
            }).then(({data}) => {
              console.log('%cEXISTING STEP SUBMITTED', "color:green",data);
              this.props.dispatch(actions.setClonedStepIdFromServer(mapIndex, data.createClonedStep.id))
            })
            // .then(() => this.props.dispatch(actions.resolveAcceptStep()))
          }
        // }
          // console.log('nextProps called / no change currentGoalStepsClone')
        })
        }
      }
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

    // ifthis.props.resolveAcceptStep) {
    //   this.props.data.refetch().then(({data}) => this.submitSubsequent(this.props.data.allClonedSteps))
    //     }

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

 // submitSubsequent(allClonedSteps) {
    // let serverClonedStepIds = allClonedSteps.map(item => item.originalId)
    // // console.log('serverClonedStepIds', serverClonedStepIds)
    //
    // let serverAndStateIdsMatch
    //
    // this.props.currentGoalStepsClone.map((stepObj, mapIndex, array) => {
    //     serverAndStateIdsMatch = serverClonedStepIds.filter((idFromServer) => {
    //       return idFromServer === stepObj.originalId
    //     })
    //     console.log('submitSubsequent serverAndStateIdsMatch', serverAndStateIdsMatch)
    //
    //     if (serverAndStateIdsMatch && serverAndStateIdsMatch.length) {
    //     console.log('%c**UPDATE SUBSEQUENT SITUATION**', "color:blue")
    //       // console.log('%cID MATCHES', "color:purple", serverAndStateIdsMatch)
    //       return this.props.submitPositionUpdate({
    //         variables: {
    //           id: serverAndStateIdsMatch[0],
    //           positionIndex: stepObj.positionIndex
    //         }
    //       }).then(({data}) => {
    //         console.log('%cSUBSEQUENT STEP POSITION UPDATED', "color:green", data)
    //       })
    //     }
    //
    //   else if (!serverAndStateIdsMatch.length && stepObj.suggestedStep === true) {
    //     console.log('%cSUBMIT SUBSEQUENT SITUATION *Suggested Step*', "color:orange")
    //     // console.log('this.props', )
    //     return this.props.submitSuggestedStep({
    //       variables: {
    //         suggestedStep: true,
    //         step: stepObj.step,
    //         positionIndex: stepObj.positionIndex,
    //         goalDocId: this.props.goalDocID,
    //         suggesterId:this.props.loggedInUserID
    //       }
    //     }).then(({data}) => {
    //       console.log('%cNEW SUBSEQUENT STEP SUBMITTED',"color:green", data);
    //       this.props.dispatch(actions.setClonedStepIdFromServer(mapIndex, data.createClonedStep.id))
    //     })
    //     // .then(() => this.props.dispatch(actions.resolveAcceptStep())
    //   }
    //
    //   else if (!serverAndStateIdsMatch && stepObj.suggestedStep === false) {
    //     console.log('%cSUBMIT SUBSEQUENT SITUATION *Existing step*', "color:orange")
    //     return this.props.submitSuggestedStep({
    //       variables: {
    //         suggestedStep: false,
    //         step: stepObj.step,
    //         positionIndex: stepObj.positionIndex,
    //         goalDocId: this.props.goalDocID,
    //         suggesterId: this.props.loggedInUserID
    //       }
    //     }).then(({data}) => {
    //       // console.log('%cEXISTING STEP SUBMITTED', "color:green",data);
    //       this.props.dispatch(actions.setClonedStepIdFromServer(mapIndex, data.createClonedStep.id))
    //     })
    //     .then(() => this.props.dispatch(actions.resolveAcceptStep()))
    //   }
    //   // console.log('no change currentGoalStepsClone')
    //   })
    // }
}

const mapStateToProps = (state, props) => {
  return {loggedInUserID: state.goals.loggedInUserID, targetUserID: state.goals.targetUserID, currentGoalID: state.goals.currentGoalID, currentGoalStepsClone: state.goals.currentGoalStepsClone, goalDocID: state.goals.currentGoalID, resolveAcceptStep: state.goals.resolveAcceptStep}
}


const SuggestStepWithMutation = compose(

graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
}),
graphql(clonedStepIdQuery, {
  options: ({goalDocID}) => ({
    variables: {
      id: goalDocID
    }
  })
}),
graphql(_suggestStepMutation, {
  name: 'submitSuggestedStep',
  props: ({submitSuggestedStep}) => ({
    submitSuggestedStep({variables}) {
      return submitSuggestedStep({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}),
graphql(positionUpdateMutation, {
  name: 'submitPositionUpdate',
  props: ({submitPositionUpdate}) => ({
    submitPositionUpdate({variables}) {
      return submitPositionUpdate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}))(withRouter(SuggestStep))

export default connect(mapStateToProps)(SuggestStepWithMutation);
