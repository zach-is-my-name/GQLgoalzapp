/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions  from '../../Actions/actions.js'
class RemoveStep extends Component {
  componentDidMount() {
    console.log('called')
  //   this.props.unrenderremovestep
  }

  render() {
    this.props.RemoveStepMutation({
      variables: {
        id: this.props.idToRemove
      }
    }).catch((error)=>console.log(error)).then(() => {
      this.props.unrenderremovestep
  })
    return null
  }
  // _submitRemoveStepMutation = (nextPropsCurrentGoalSteps) => {
  //   nextPropsCurrentGoalSteps.map(async (stepObj, mapIndex) => {
  //     let id
  //     if ()
  //   })
  // }
}


const RemoveStepMutation = gql `mutation RemoveStepMutation($id: ID!) {
  deleteStep(id: $id) {
    step
  }
}`

const RemoveStepWithMutation = graphql(RemoveStepMutation, {
  props: ({mutate}) => ({
    RemoveStepMutation({variables}) {
      return mutate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
})(RemoveStep)

const mapStateToProps = (state, props) => {
  return ({
    idToRemove: state.goals.idToRemove
  })
}

export default connect(mapStateToProps)(RemoveStepWithMutation)
