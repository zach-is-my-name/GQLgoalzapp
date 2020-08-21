/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../../Actions/actions'
import AddStep from './AddStep'
import '../../style/AddStep.css'

const stepIdQuery = gql `
query stepIdQuery($id:ID){
  stepsList(filter: {stepsOfGoalDoc: {id: {equals: $id}}}, sort: {positionIndex: ASC}) {
      items {
        id
        positionIndex
        step
        suggestedStep
      }
    }
  }`

const clonedStepIdQuery = gql `
query clonedStepIdQuery($id: ID) {
  clonedStepsList(filter: {clonedStepsOfGoalDoc: {id: {equals: $id}}}, sort: {positionIndex: ASC}) {
    items {
      positionIndex
      step
      suggestedStep
      id
    }
  }
}
  `
const createStep = gql `
mutation createStep(
  $goalDocId: ID,
  $step: String!,
  $positionIndex: Int,
  $suggestedStep: Boolean
) {
  stepCreate(data: {step: $step,
    stepsOfGoalDoc: {connect: {id: $goalDocId}},
    positionIndex: $positionIndex,
    suggestedStep: $suggestedStep}) {
    step,
    id,
    stepsOfGoalDoc {
      id
    }
  }
}
`

const updateStep = gql `
mutation updateStep(
  $id: ID!,
  $positionIndex: Int
) {
  stepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
  }) {
    id
    positionIndex
    suggestedStep
    step
  }
}
`
const updateClonedStep = gql ` mutation updateClonedStep(
  $id: ID!,
  $positionIndex: Int,
) {
  clonedStepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
  }) {
    id
    positionIndex
    stepsId
    suggestedStep
    step
  }
}
`
const createClonedStep = gql `
mutation createClonedStep($goalDocId: ID, $step: String!, $positionIndex: Int, $stepsId: String, $suggestedStep: Boolean) {
  clonedStepCreate(data: {
    step: $step,
    positionIndex: $positionIndex,
    suggestedStep: $suggestedStep,
    stepsId: $stepsId,
    clonedStepsOfGoalDoc: {connect: {id: $goalDocId}}}) {
      step
      id
      stepsId
      clonedStepsOfGoalDoc {
        id
      }
    }
}
`

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


class AddStepSmart extends React.Component {

  constructor(props) {
    super(props)
    this._submitStep = this._submitStep.bind(this);
    this._reorderSteps = this._reorderSteps.bind(this)
    this._submitAddStepMutation = this._submitAddStepMutation.bind(this)
    this._submitAddClonedStepMutation = this._submitAddClonedStepMutation.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      step: '',
    }
  }

  render() {
    if (this.props.loggedInUserId === this.props.targetUserId) {
      return <AddStep
        _submitStep={this._submitStep}
        handleChange={this.handleChange}
        value={this.state.step} />
    }
    return null
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }

  async _submitStep(event) {
    event.preventDefault()
    const {stepIdQuery, clonedStepIdQuery} = this.props
    const createdStepId =  await this._submitAddStepMutation(this._reorderSteps(stepIdQuery))
    await this._submitAddClonedStepMutation(this._reorderClonedSteps(clonedStepIdQuery, createdStepId))
    this.props.unrenderAddStepFunction()
  }

  _reorderSteps(queryResult) {
    const {loading, error} = queryResult
    const {stepIndex} = this.props
    if (!loading) {
      const newSteps = queryResult.stepsList.items.slice()
      const newStep = {
        step: this.state.step,
        suggestedStep: false,
        id: null,
        positionIndex: null,
        goalDocId: this.props.goalDocId
      }
      newSteps.splice(stepIndex, 0, newStep)

      newSteps.sort((a,b) => a.positionIndex - b.positionIndex)

      let _newSteps = newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index
      }))

      return _newSteps
    }
  }

  async _submitAddStepMutation(newStepsSortedByPositionIndex) {
    let createdStepId
    try {
      const mapFunct = await newStepsSortedByPositionIndex.map(async (stepObj, mapIndex) => {
        if (stepObj.id) {
           await this.props.updateStep({
            variables: {
              id: stepObj.id,
              step: stepObj.step,
              suggestedStep: stepObj.suggestedStep,
              goalDocId: stepObj.goalDocId,
              positionIndex: stepObj.positionIndex
            }
          })
        } else {
          const createStepResult = await this.props.createStep({
            variables: {
              step: stepObj.step,
              suggestedStep: stepObj.suggestedStep,
              goalDocId: stepObj.goalDocId,
              positionIndex: stepObj.positionIndex
            }
          })
          return createStepResult
        }
      })
      const idObj = await Promise.all(mapFunct).then(results =>results.find(obj => obj && obj.data && obj.data.stepCreate.id))
      //result[0].data.stepCreate.id)
      const idValue = idObj.data.stepCreate.id
      return idValue
    }
      catch (error) {
        console.log(error)
      }
}

  _reorderClonedSteps(queryResult, returnedId) {
    const {loading, error} = queryResult
    if (!loading) {
      const {clonedStepIdQuery} = queryResult
      const {stepIndex} = this.props
      const newSteps = queryResult.clonedStepsList.items.slice()
        const newStep = {
          step: this.state.step,
          suggestedStep: false,
          id: null,
          positionIndex: null,
          stepsId: returnedId,
          goalDocId: this.props.goalDocId
        }
      newSteps.splice(stepIndex, 0, newStep)
       const _newSteps = newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index,
      }))
      return _newSteps
  }
}

  _submitAddClonedStepMutation (newClonedStepsSortedByPositionIndex) {
    try {
    newClonedStepsSortedByPositionIndex.map(async (stepObj, mapIndex) => {
      if (stepObj.id) {
        const updatedClonedStepResult = await this.props.updateClonedStep({
          variables: {
            id: stepObj.id,
            positionIndex: stepObj.positionIndex,
          }
        })
      } else {
        const createdClonedStepResult = await this.props.createClonedStep({
          variables: {
            step: stepObj.step,
            suggestedStep: stepObj.suggestedStep,
            goalDocId: this.props.goalDocId,
            positionIndex: stepObj.positionIndex,
            stepsId: stepObj.stepsId
          }
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}
}


const AddStepWithApollo = compose(

  graphql(updateStep, {
  name:'updateStep',
  props: ({updateStep}) => ({
    updateStep({variables}) {
      return updateStep({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery']
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }
  }),
}),
  graphql(createStep, {
  name: 'createStep',
  props: ({createStep}) => ({
    createStep({variables}) {
      return createStep({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery']
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }
  }),
}),
graphql(updateClonedStep, {
  name: 'updateClonedStep',
  props: ({updateClonedStep}) => ({
    updateClonedStep({variables}) {
      return updateClonedStep({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery'],
      }).catch((error) => {
        console.log(error)
      })
    }
  })
}),
graphql(createClonedStep, {
  name: 'createClonedStep',
  props: ({createClonedStep}) => ({
    createClonedStep({variables}) {
      return createClonedStep({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery'],
      }).catch((error) => {
        console.log(error)
      })
    }
  })
}),
graphql(stepIdQuery, {
  name: "stepIdQuery",
  options: (ownProps) => ({
    variables: {
      id: ownProps.goalDocId
    },
    fetchPolicy: 'network-only'
  })
}),
 graphql(clonedStepIdQuery, {
  name: "clonedStepIdQuery",
  options: (ownProps) => ({
    variables: {
      id: ownProps.goalDocId
    },
    fetchPolicy: 'network-only'
  })
})
)(withRouter(AddStepSmart))


export default (AddStepWithApollo)
