/* eslint-disable */
// index is passed down as stepIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions.js'
import '../../style/CurrentSteps.css'
import OwnGoalCurrentSteps from './OwnGoalCurrentSteps.js'
import ForeignGoalCurrentSteps from './ForeignGoalCurrentSteps.js'

// arr.map(obj => obj.suggester.userName).filter((item, pos, self) => self.indexOf(item) == pos)

// arr.filter((obj, index, self) =>
//   self.findIndex((findObj) => {return (obj.userName === findObj.userName && obj.id === findObj.id)}) === index)
//
// const clonedStepsArr = result.data.GoalDoc.clonedSteps
//
// const arrGoalDocSuggesters =  clonedStepsArr.map(obj => ({userName: obj.suggester.userName, id: obj.suggester.id})).filter((obj, index, self) =>
//   self.findIndex((findObj) => {return (obj.userName === findObj.userName && obj.id === findObj.id)}) === index)

const goalDocByIdQuery = gql `
query goalDocByIdQuery ($goalDocId: ID) {
  GoalDoc(id: $goalDocId) {
   goal
   id
   steps(orderBy:positionIndex_ASC) {
     step
     positionIndex
     suggestedStep
     id
   }
   clonedSteps(orderBy:positionIndex_ASC)
    {
     step
     positionIndex
     id
     suggestedStep
     suggestRemove
     stepsId
     suggester {
       userName
       id
     }
   }  }
}`;

// const  suggesterClonedSteps = gql `
//  query suggesterClonedSteps($goalDocId:ID){
//    allClonedSteps(filter: {goalDoc: {id: $goalDocId}}, orderBy: positionIndex_ASC) {
//       id
//       positionIndex
//       step
//       suggestedStep
//
//     }
//   }`

class CurrentStepsSmart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.goalDocById.networkStatus === 7 && !this.props.goalDocById.GoalDoc) {
      console.log('CurrentSteps-smart --> refetch called')
      this.props.goalDocById.refetch()
    }
  }

  componentDidUpdate(nextProps) {
    if(this.props.goalDocById.networkStatus === 7 && !this.props.goalDocById.GoalDoc ||
    nextProps.goalDocById.networkStatus === 7 && !nextProps.goalDocById.GoalDoc){
    console.log(nextProps.goalDocById)
    // if (this.props.goalDocById.networkStatus === 7 && this.props.goalDocById.GoalDoc == false) {
      console.log('CurrentSteps-smart --> refetch called')
      nextProps.goalDocById.refetch()
    // }
  }
  }

  render() {
    if(this.props.goalDocById.networkStatus === 7 && !this.props.goalDocById.GoalDoc){
    console.log(this.props.goalDocById)
    // if (this.props.goalDocById.networkStatus === 7 && this.props.goalDocById.GoalDoc == false) {
      console.log('CurrentSteps-smart --> refetch called')
      this.props.goalDocById.refetch()
    // }
  }
    console.log('this.props.goalDocById.networkStatus',this.props.goalDocById.networkStatus )
    console.log('this.props.goalDocById.GoalDoc', !!this.props.goalDocById.GoalDoc)
    if (this.props.goalDocById.networkStatus === 7 && this.props.goalDocById.GoalDoc == false){
    console.log('__PROBLEM__  networkStatus === 7 && !this.props.goalDocById.GoalDoc')
    }
    const {loggedInUserId, targetUser} = this.props
    let clonedSteps
    let children
    let steps
    // let {loading} = this.props.goalDocById
    let acceptedStep
    let goalOwnerStep
    let selectedSuggesterSuggested
    if (this.props.goalDocById.loading || !this.props.goalDocById.GoalDoc) {
      return <div>Loading...</div>
    }

    else if (this.props.selectedSuggesterId !== this.props.loggedInUserId) {

      this.props.goalDocById.GoalDoc.clonedSteps.forEach(stepObj => {
        acceptedStep = !stepObj.suggestedStep && stepObj.suggester && stepObj.suggester.id === this.props.selectedSuggesterId
        goalOwnerStep = !stepObj.suggestedStep && !stepObj.suggester
        // console.log(stepObj.suggester.id)
        selectedSuggesterSuggested = stepObj.suggestedStep && stepObj.suggester && (stepObj.suggester.id === this.props.selectedSuggesterId)})

        console.log('acceptedStep',acceptedStep)
        console.log('goalOwnerStep ', goalOwnerStep)
        console.log('selectedSuggesterSuggested', selectedSuggesterSuggested )


      // if (this.props.goalDocById && !this.props.goalDocById.loading) {
        /*filter out clonedStep (stepObj.suggestedStep === true && stepObj.suggester.id !== selectedSuggesterId)*/
        // console.log(this.props.suggesterClonedSteps)
        clonedSteps = this.props.goalDocById.GoalDoc.clonedSteps.filter(stepObj => {
          return acceptedStep || goalOwnerStep  || selectedSuggesterSuggested
        })
        // console.log('clonedSteps filter', clonedSteps)
        steps = this.props.goalDocById.GoalDoc.steps

        return (<div className="current-steps-smart-container">
          {
            loggedInUserId !== targetUser
              ? <ForeignGoalCurrentSteps goalDocId={this.props.goalDocId}
                targetUser={targetUser}
                loggedInUserId={loggedInUserId}
                clonedSteps={clonedSteps || []}
                steps={steps || []}
                selectedSuggesterId={this.props.selectedSuggesterId}
                suggestersIndex={this.props.suggestersIndex}/>
              : <OwnGoalCurrentSteps
                randomColorStep={this.props.randomColorStep}
                clonedSteps={clonedSteps || []}
                steps={steps || []}
                goalDocId={this.props.goalDocId}
                targetUser={targetUser}
                loggedInUserId={this.props.loggedInUserId}
                selectedSuggesterId={this.props.selectedSuggesterId}
                suggestersIndex={this.props.suggestersIndex}/>
          }
        </div>)
      // }
      return null
    } else if (this.props.selectedSuggesterId === this.props.loggedInUserId) {
      if (this.props.goalDocById && !this.props.goalDocById.loading && this.props.goalDocById.GoalDoc) {
        clonedSteps = this.props.goalDocById.GoalDoc.clonedSteps
        steps = this.props.goalDocById.GoalDoc.steps
        // console.log('clonedSteps no filter', clonedSteps)

        return (<div className="current-steps-smart-container">
          {
            loggedInUserId !== targetUser
              ? <ForeignGoalCurrentSteps
                goalDocId={this.props.goalDocId}
                targetUser={targetUser}
                loggedInUserId={loggedInUserId}
                clonedSteps={clonedSteps || []} steps={steps || []}
                selectedSuggesterId={this.props.selectedSuggesterId}
                suggestersIndex={this.props.suggestersIndex}/>
              : <OwnGoalCurrentSteps
                randomColorStep={this.props.randomColorStep}
                clonedSteps={clonedSteps || []}
                steps={steps || []}
                goalDocId={this.props.goalDocId}
                targetUser={targetUser}
                loggedInUserId={this.props.loggedInUserId}
                selectedSuggesterId={this.props.selectedSuggesterId}
                suggestersIndex={this.props.suggestersIndex}/>
          }
        </div>)
      }
      return null
    }
    return null
  }

}

const WithData = compose(graphql(goalDocByIdQuery, {
  name: 'goalDocById',
  options: (ownProps) => {
    return ({
      variables: {
        goalDocId: ownProps.goalDocId
      },
      skip: ownProps=> !ownProps.goalDocId
    })
  }
}))(CurrentStepsSmart)
// graphql(suggesterClonedSteps, {
//   name: 'suggesterClonedSteps',
//   options: (ownProps) => {
//     return({ variables: {goalDocId: ownProps.goalDocId}})
//   },
//   skip: ownProps => ownProps.selectedSuggesterId === ownProps.loggedInUserId
// }
// ))(CurrentStepsSmart)

export default WithData
// export default connect(mapStateToProps)(CurrentStepsSmart);
