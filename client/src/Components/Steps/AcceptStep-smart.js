/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import goalescrow from '../../abi/GoalEscrowTestVersion.json'
import * as DeployedAddress from '../../ContractAddress.js'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
let proxyAddress
let ProxiedGoalEscrow

const stepIdQuery1 = gql `
query stepIdQuery($id:ID){
  allSteps(filter: {goalDoc: {id: $id}}, orderBy: positionIndex_ASC) {
     id
     positionIndex
     step
     suggestedStep
   }
 }`

const stepIdQuery = gql `
query stepIdQuery($id:ID){
  stepsList(filter: {goalDoc: {id: {equals: $Id}}}, sort: {step: ASC}) {
      items {
        id
        positionIndex
        step
        suggestedStep
      }
    }
  }`

 const UpdateOrCreateStep1 = gql `
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

const createStep = gql `
mutation createStep(
  $goalDocId: ID,
  $step: String!,
  $positionIndex: Int,
  $suggestedStep: Boolean
) {
  stepCreate(data: {step: $step,
    goalDoc: {connect: {id: $goalDocId}},
    positionIndex: $positionIndex,
    suggestedStep: $suggestedStep}) {
    step,
    id,
    goalDoc {
      id
    }
  }
}
`
const updateStep =  gql `
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



const UpdateClonedStep1 =
gql `mutation updateClonedStep($id: ID!, $suggestedStep: Boolean, $stepsId: String) {
      updateClonedStep(id: $id, suggestedStep: $suggestedStep, stepsId: $stepsId) {
        step
        id
        suggestedStep
        stepsId
  }
}`

const UpdateClonedStep = gql ` mutation updateClonedStep(
  $id: ID!,
  $suggestedStep: Boolean,
  $stepsId: String,
  $positionIndex: Int
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

 class AcceptStep extends Component {
   proxyAddress = this.props.proxyAddress
  constructor(props) {
    super(props)
    this._submitAcceptStep = this._submitAcceptStep.bind(this)
    this._reorderSteps = this._reorderSteps.bind(this)
    this._submitUpdateClonedSteps = this._submitUpdateClonedSteps.bind(this)
    this._submitAcceptStepMutation = this._submitAcceptStepMutation.bind(this)
}

  componentDidMount() {
    console.log('props.selectedAccount', this.props.selectedAccount)
    this.props.unrenderAcceptStepFunction()
    console.log('click handler accept step')
  }

  render() {
  console.log("Rendering App")
  if (this.props.renderAcceptStepState === true) {
      this._submitAcceptStep()
  }
  return null
  }

async _submitAcceptStep(clonedStepIdQuery) {
  ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.props.proxyAddress)
  let acceptStepReceipt = await ProxiedGoalEscrow.methods.disburseOnAccept(web3.utils.toHex(this.props.goalDocId)).send({from: window.ethereum.selectedAddress})
  .on('error', error => console.log(error))
  console.log('acceptStepReceipt', acceptStepReceipt)
  if (acceptStepReceipt === 'Error' || false) {
    return
  }
  let stepIdQueryResult
  try {
    // const id  = this.props.goalDocId
       stepIdQueryResult  = await this.props.client.query({
         query: stepIdQuery, variables : {
           id: this.props.goalDocId},
           fetchPolicy: 'network-only'
         })
    } catch (error) {
      console.log(error)
    }

  try {
  const returnedIdArr =   await this._submitAcceptStepMutation(this._reorderSteps(stepIdQueryResult))
  const returnedId = returnedIdArr[0]
  this._submitUpdateClonedSteps(returnedId)
  }
 catch (error) {
  console.log(error)
  }
}

async _submitAcceptStepMutation (newStepsSortedByPositionIndex) {
  try {
    const mapFunction =  newStepsSortedByPositionIndex.map(async (stepObj, mapIndex) => {
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
          console.log(result)
          if (!stepObj.id) {
            return result.data.updateOrCreateStep.id
          }

          // .then((data) => console.log(data))
          // .then((data)  => stepObj && !stepObj.id  ? data.updateOrCreateStep.id : null)
          // .then(result => console.log(result))
        })
        console.log(mapFunction)
        const arrayOfReturnedId = Promise.all(mapFunction).then(ids => ids.filter(id => id !== undefined))
        return arrayOfReturnedId
      // }
} catch (error) {
  console.log(error)
}
}

_reorderSteps(queryResult) {
     console.log(queryResult)
     try {
    const {loading } = queryResult
    if (!loading) {
    // const {error, stepIdQuery} = queryResult

    const stepIndex = this.props
    if (!loading) {
      console.log(this.props)
      console.log(queryResult)
      const newSteps = queryResult.data.allSteps.slice()
      const newStep = {
        step: this.props.acceptedStep,
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
  } catch (error) {
    console.log(error)
}
}



  _submitUpdateClonedSteps(returnedStepId) {
    const id  = this.props.clonedStepId
    console.log(id)
    this.props.updateClonedStep({variables: {
      id: id,
      suggestedStep: false,
      stepsId: returnedStepId
    }
  })
  }
}

const WithData = compose(
//   graphql(stepIdQuery, {
//   name: "stepIdQuery",
//   options: (ownProps) => ({
//     variables: {
//       id: ownProps.goalDocId
//     },
//     // fetchPolicy: 'network-only'
//   })
// })
// ,
graphql(UpdateClonedStep, {
  name: 'updateClonedStep',
  props: ({updateClonedStep}) => ({
    updateClonedStep({variables}) {
      return updateClonedStep({
        variables: {
          ...variables
        }
      ,refetchQueries:['goalDocByIdQuery']})
        .catch((error) => {
          console.log(error)
        })
      }
    })
})
// ,
//  graphql(UpdateOrCreateStep, {
//    name: 'updateOrCreateStep',
//    props: ({updateOrCreateStep}) => ({
//     updateOrCreateStep({variables}) {
//       return updateOrCreateStep({
//         variables: {
//           ...variables
//         }
//       ,
//       refetchQueries:['goalDocByIdQuery']
//     })
//         .catch((error) => {
//           console.log(error)
//         })
//       }
//     })
// })
)(AcceptStep)

export default withApollo(WithData)
