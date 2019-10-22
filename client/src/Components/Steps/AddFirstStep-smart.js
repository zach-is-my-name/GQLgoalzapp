import React, {Component} from 'react'
import AddStepSmart from './AddStep-smart.js'
import PlusButton from '../Buttons/PlusButton.js'

class AddFirstStep extends Component  {
    constructor(props) {
      super(props)
      this.state = {
        renderAddStepState: false,
        stepIndex: 0,
      }
    this.clickHandlerAddStep = this.clickHandlerAddStep.bind(this);
    this.unrenderAddStep = this.unrenderAddStep.bind(this)
    }

    render() {
      return (
        <div>
        <PlusButton
          clickHandlerPlus={this.clickHandlerAdd}
        />
  { this.state.renderAddStepState ?
    <AddStepSmart
      stepIndex={this.state.stepIndex}
      goalDocId={this.props.goalDocId}
      unrenderAddStepFunction={this.unrenderAddStep}
        />
     : null  }
        </div>  )
     }

  clickHandlerAdd(stepIndex) {
    renderAddStepState: !prevState.renderAddStepState
  }

  unrenderAddStep() {
    this.setState({
      renderAddStepState: false,
    })
  }
}

export default AddSFirstStep
