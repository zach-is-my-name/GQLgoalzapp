/* eslint-disable */
import React, {Component} from 'react';
import YesNoPrompt from './YesNoPrompt.js'
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions  from '../../Actions/actions.js'

class SuggestEditStep extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.submitEditedStep = this.submitEditedStep.bind(this)
    this.state = {
      editedStep: ''
    }
  }

  submitEditedStep(event) {
      console.log("SuggestEdit Submit Handler: this.state.editedStep", this.state.editedStep)
      event.preventDefault()
      this.props.updateClonedStep({
        variables: {
        id: this.props.id,
        stepChange: this.state.editedStep
        }
      })
      .then(({data}) =>  {
        console.log('SUBMITTED EDITED STEP', data)
      this.props.dispatch(actions.suggestEditStep(this.props.index, data.updateClonedStep.step, data.updateClonedStep.id))
      })
      this.setState({editedStep: ""})
    }

  handleChange(event) {
    this.setState({editedStep: event.target.value})
  }

render() {




 return (
<div className="editstep-form">
  <form onSubmit={this.submitEditedStep}>
    <input type="text" onChange={this.handleChange} placeholder={this.state.editedStep}
      value={this.state.editedStep}  />
    <input type="submit" value="Submit Edited Step" />
  </form>
</div>
)
}
}

const suggestEditStep = gql `mutation suggestEditStepMutation($stepChange: String, $id: ID!) {
  updateClonedStep( id: $id, step: $stepChange) {
    step,
    id
  }
}`


const SuggestEditWithMutation = graphql(suggestEditStep, {
  props: ({mutate}) => ({
    updateClonedStep({variables}){
      return  mutate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
})
})(SuggestEditStep)

export default connect()(SuggestEditWithMutation)
