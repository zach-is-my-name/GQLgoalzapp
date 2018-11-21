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
  allSteps(filter: {goalDoc: {id: $id}}, orderBy: positionIndex_ASC) {
     id
     positionIndex
     step
   }
 }`

 const clonedStepIdQuery = gql `
 query clonedStepIdQuery($id:ID){
   allClonedSteps(filter: {goalDoc: {id: $id}}, orderBy: positionIndex_ASC) {
      id
      positionIndex
      step
      suggestedStep

    }
  }`

const UpdateOrCreateStep = gql `
mutation updateOrCreateStepMutation ($goalDocId:ID, $step: String!, $id: ID!, $positionIndex: Int, $suggestedStep: Boolean) {
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
}`

const UpdateOrCreateClonedStep = gql `mutation updateOrCreateClonedStepMutation ($goalDocId: ID, $id: ID!, $positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $suggesterId: ID, $stepsId: String) {
    updateOrCreateClonedStep(create: {goalDocId: $goalDocId,
    positionIndex: $positionIndex,
    step: $step, suggestedStep:$suggestedStep, stepsId: $stepsId  }, update: {goalDocId: $goalDocId, positionIndex:
    $positionIndex, id: $id, suggesterId: $suggesterId, suggestedStep:$suggestedStep, stepsId: $stepsId}) {
      step
      id
      goalDoc {
        id
      }
    }}`

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

  componentDidMount() {
    // console.log('AddStep')
  }

  render() {
    // if (!this.props.data.user) {console.warn('only logged in users can create new posts')}
    if (this.props.loggedInUserId === this.props.targetUser) {
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
    // console.log(this._reorderSteps(stepIdQuery))
    const returnedIdArr =  await this._submitAddStepMutation(this._reorderSteps(stepIdQuery))
    const returnedId = returnedIdArr[0]
    await this._submitAddClonedStepMutation(this._reorderClonedSteps(clonedStepIdQuery, returnedId))
    this.props.unrenderAddStepFunction()
  }

  _reorderSteps(queryResult) {
    const {loading, error} = queryResult
    const {stepIndex} = this.props
    console.log(stepIndex)
    if (!loading) {
      const newSteps = queryResult.allSteps.slice()
      const newStep = {
        step: this.state.step,
        suggestedStep: false,
        id: null,
        positionIndex: null
      }
      newSteps.splice(stepIndex, 0, newStep)
      return  newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index
      }))
    }
  }

  async _submitAddStepMutation(newStepsSortedByPositionIndex) {
    try {
      const mapFunct = newStepsSortedByPositionIndex.map(async (stepObj, mapIndex) => {
      let id
      if (!stepObj.id) {
        id = "x"
      } else {
        id = stepObj.id
      }

        const result = await this.props.updateOrCreateStep({
        variables: {
          goalDocId: this.props.goalDocId,
          step: stepObj.step,
          id: id,
          positionIndex: stepObj.positionIndex,
          suggestedStep: false
        }
      })
       if (!stepObj.id) {
        return  result.data.updateOrCreateStep.id
         }
       }
     )
        const arrayOfReturnedId = Promise.all(mapFunct).then((ids)=>ids.filter((id)=> id !== undefined))
        return arrayOfReturnedId
      }

 catch (error) {
     console.log(error)
   }
}


  _reorderClonedSteps(queryResult, returnedId) {
    // console.log(returnedStepId)
    const {loading, error } = queryResult
    if (!loading) {
    const {clonedStepIdQuery} = queryResult
    const {stepIndex} = this.props
    const newSteps = queryResult.allClonedSteps.slice()
      const newStep = {
        step: this.state.step,
        suggestedStep: false,
        id: null,
        positionIndex: null,
        stepsId: returnedId,
      }
    newSteps.splice(stepIndex, 0, newStep)
     const _newSteps = newSteps.map((stepObj, index) => ({
      ...stepObj,
      positionIndex: index,
    }))
    return _newSteps
  }}

  _submitAddClonedStepMutation (newClonedStepsSortedByPositionIndex) {
    try {
    newClonedStepsSortedByPositionIndex.map(async (stepObj, mapIndex) => {
      let id
      if (stepObj.id) {
        id = stepObj.id
      } else {
        id = "x"
      }

       await this.props.updateOrCreateClonedStep({
        variables: {
          goalDocId: this.props.goalDocId,
          id: id,
          positionIndex: stepObj.positionIndex,
          suggestedStep: stepObj.suggestedStep,
          step: stepObj.step,
          stepsId: stepObj.stepsId
        }
      })
          })
  } catch (error) {
    console.log(error)
  }
}
}


const AddStepWithApollo = compose(graphql(UpdateOrCreateStep, {
  name:'updateOrCreateStep',
  props: ({updateOrCreateStep}) => ({
    updateOrCreateStep({variables}) {
      return updateOrCreateStep({
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
graphql(UpdateOrCreateClonedStep, {
  name: 'updateOrCreateClonedStep',
  props: ({updateOrCreateClonedStep}) => ({
    updateOrCreateClonedStep({variables}) {
      return updateOrCreateClonedStep({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery']
      }).catch((error) => {
        console.log(error)
      })
    }
  })
}), graphql(stepIdQuery, {
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

// const userQuery = gql`
//   query userQuery {
//     user {
//       id
//     }
//   }
// `
