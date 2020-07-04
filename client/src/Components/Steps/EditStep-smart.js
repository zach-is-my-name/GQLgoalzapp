/* eslint-disable */
import React, {Component} from 'react';
import EditStep from './EditStep.js'
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';



const updateStepMutation1 = gql `mutation  UpdateStepMutation($id: ID!, $step: String) {
  updateStep(id: $id, step: $step) {
    id
    step
  }
}`

const updateStepMutation =  gql `
mutation updateStep(
  $id: ID!,
  $suggestedStep: Boolean,
  $positionIndex: Int
) {
  stepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
    suggestedStep: $suggestedStep
  }) {
    id
    positionIndex
    suggestedStep
    step
  }
}`

const clonedStepIdQuery1 = gql ` query ClonedStepByIdQuery ($stepsId: String){
    allClonedSteps(filter: { stepsId: $stepsId}){
      id
    }
  }`

const clonedStepIdQuery = gql `
query clonedStepIdQuery($id: ID) {
  clonedStepsList(filter: {clonedStepsOfGoalDoc: {id: {equals: $id}}}, sort: {step: ASC}) {
    items {
      positionIndex
      step
      suggestedStep
      id
    }
  }
}
  `

const updateClonedStepMutation1 = gql `mutation  UpdateClonedStepMutation($id: ID!, $step: String) {
  updateClonedStep(id: $id, step: $step) {
    id
    step
  }
}`
// const updateClonedStepMutation = gql ``

const updateClonedStepMutation = gql ` mutation updateClonedStep(
  $id: ID!,
  $step: step
  $suggestedStep: Boolean,
  $positionIndex: Int,
  $stepsId: String,
) {
  clonedStepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
    stepsId: $stepsId,
    suggestedStep: $suggestedStep
  }) {
    id
    positionIndex
    stepsId
    suggestedStep
    step
  }
}
`

const goalDocByIdQuery1 = gql `
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
       clonedSteps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         id
         suggestedStep
         stepsId
         suggester {
           id
           userName
         }
       }
      }
    }`;

const goalDocByIdQuery = gql `query GoalDocByIdQuery ($goalDocId: ID) {
  goalDoc(id: $goalDocId) {
   goal
   id
   steps(orderBy:positionIndex_ASC) {
     items {
     step
     positionIndex
     suggestedStep
     id
    }}
   clonedSteps(orderBy:positionIndex_ASC) {
     items {
     positionIndex
     id
     suggestedStep
     stepsId
     suggester {
       id
       userName
     }
    }
   }
  }
}`




 class EditStepSmart extends Component {
   constructor(props) {
     super(props)
     this._submitEditedStep = this._submitEditedStep.bind(this)
     this._handleChange = this._handleChange.bind(this)
     this.state = {
       editedStep: props.stepObj.step,
     }
}

render() {
 return (
   <EditStep
     _submitEditedStep={this._submitEditedStep}
     handleChange={this._handleChange}
     value={this.state.editedStep}
     unrenderEditFunction={this.props.unrenderEditFunction}
   />
     )}

  _handleChange(e) {
      this.setState({editedStep: e.target.value})
  }

async  _submitEditedStep(e) {
   console.log("_submitEditedStep Called")
   e.preventDefault()
   await  this.props.updateStep({variables : {
     id: this.props.stepObj.id,
     step: this.state.editedStep
   }})
   if (!this.props.clonedStepIdQuery.loading) {
    const clonedStepId = this.props.clonedStepIdQuery.allClonedSteps[0].id
    await this.props.updateClonedStep({variables : {
      id: clonedStepId,
      step: this.state.editedStep
    }}).catch(error => console.log(error))
  }
   this.props.unrenderEditFunction()
 }
}

    export default compose(
      graphql(updateStepMutation, {
      props: ({mutate}) => ({
        updateStep({variables}) {
          return mutate({
            variables: {
              ...variables
          },
          refetchQueries: ['goalDocByIdQuery']
        })
        }
      })
    }),
    graphql(clonedStepIdQuery, {
      name: 'clonedStepIdQuery',
     options: (ownProps) => ({
       variables: {
         stepsId: ownProps.stepObj.id
       }
     })
   }),
   graphql(updateClonedStepMutation, {
     props: ({mutate}) => ({
       updateClonedStep({variables}) {
         return mutate({
           variables: {
             ...variables
           },
           refetchQueries: ['goalDocByIdQuery'],
         })
       }
     })
   })
  )(EditStepSmart)
