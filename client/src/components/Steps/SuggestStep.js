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
      step: " ",
      readyToFireSuggestStepMutation: false,
      positionIndexToSubmit: ""
    }
  }

  _submitSuggestedStep(event) {
    event.preventDefault()

    const {step} = this.state
    const goalDocId = this.props.currentGoalID
    const suggesterId = this.props.loggedInUserID
    const index = this.props.index
    this.props.dispatch(actions.setSuggestedStep(step, index))
    this.props.dispatch(actions.setSuggestedStepPositionIndex())
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }

  //use this to get the step you added from dispatch in mapStateToProps
  componentWillReceiveProps(nextProps) {
    console.log('componentwillreceiveprops called')
    // const {step} = this.state
    const goalDocId = nextProps.currentGoalID
    const suggesterId = nextProps.loggedInUserID
    const index = nextProps.index

    let stepIdsFromServer

    const {data: {loading, error, allClonedSteps}} = this.props

    if (nextProps.currentGoalStepsClone.length > this.props.currentGoalStepsClone.length) {
      console.log('nextprops > this.props')
    this.props.data.refetch()
    if (!this.props.data.loading) {
    console.log('%cQUERY CALLED NEW STEP / RE-FETCH', "font-weight: bold", allClonedSteps)
    stepIdsFromServer = this.props.data.allClonedSteps.map((item) =>
         item.id
        )


    let idMatchingServerAndStore

    nextProps.currentGoalStepsClone.map((stepObj, mapIndex, array) => {

      console.log('MAP CALLED, stepIdsFromServer =', stepIdsFromServer)
      if (stepIdsFromServer !== undefined && stepIdsFromServer.length > 0 && stepObj.id) {
        console.log('%c**UPDATE SITUATION**', "color:blue")
        idMatchingServerAndStore = stepIdsFromServer.filter((idFromServer) => {
          return idFromServer === stepObj.id
        })

        if (idMatchingServerAndStore !== undefined && idMatchingServerAndStore.length > 0) {
          console.log('%cID MATCHES', "color:purple", idMatchingServerAndStore)
          return this.props.submitPositionUpdate({
            variables: {
              id: idMatchingServerAndStore[0],
              positionIndex: stepObj.positionIndex
            }
          }).then(({data}) => {
            console.log('%cSTEP POSITION UPDATED', "color:green", data)
          })
        }
      }

      else if (stepObj.suggestedStep === true) {
        console.log('%cSUBMIT SITUATION *suggestedStep*', "color:orange")
        return this.props.submitSuggestedStep({
          variables: {
            suggestedStep: true,
            step: stepObj.step,
            positionIndex: stepObj.positionIndex,
            goalDocId,
            suggesterId
          }
        }).then(({data}) => {
          console.log('%cNEW STEP SUBMITTED',"color:green", data);
          this.props.dispatch(actions.setSuggestedStepIdFromServer(mapIndex, data.createClonedStep.id))
        })
      }

      else if (stepObj.suggestedStep === false) {
        console.log('%cSUBMIT SITUATION *Existing step*', "color:orange")
        return this.props.submitSuggestedStep({
          variables: {
            suggestedStep: false,
            step: stepObj.step,
            positionIndex: stepObj.positionIndex,
            goalDocId,
            suggesterId
          }
        }).then(({data}) => {
          console.log('%cEXISTING STEP SUBMITTED', "color:green",data);
          this.props.dispatch(actions.setSuggestedStepIdFromServer(mapIndex, data.createClonedStep.id))
        })

      }
      console.log('nextProps called / no change currentGoalStepsClone')
      return
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
    // console.log('currentGoalStepsClone', this.props.currentGoalStepsClone)
    // console.log(this.props)


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

const mapStateToProps = (state, props) => {
  // console.log('mapStateToProps called')
  return {loggedInUserID: state.goals.loggedInUserID, targetUserID: state.goals.targetUserID, currentGoalID: state.goals.currentGoalID, currentGoalStepsClone: state.goals.currentGoalStepsClone, goalDocID: state.goals.currentGoalID}
}

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
}}`

const suggestStepMutation = gql `mutation ($positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $goalDocId: ID, $suggesterId: ID) {
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

const submitPositionUpdate = gql `mutation($id: ID!, $positionIndex: Int)
 {updateClonedStep(id:$id, positionIndex: $positionIndex
) {
   id
 }} `

const SuggestStepWithMutation = compose(graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
}), graphql(clonedStepIdQuery, {
  options: ({goalDocID}) => ({
    variables: {
      id: goalDocID
    }
  })
}), graphql(suggestStepMutation, {
  name: 'submitSuggestedStep'
}, {
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
}), graphql(submitPositionUpdate, {
  name: 'submitPositionUpdate'
}, {
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

export default connect(mapStateToProps)(SuggestStepWithMutation);
