import React, {Component} from 'react';
import YesNoPrompt from './YesNoPrompt.js'

export default class SuggestEditStep extends Component {

render() {
 return (
<div className="editstep-form">
  <form onSubmit={e => this.props.submitEditedStep(e,this.props.index,this.props.editedStep)}>
    <input type="text" onChange={this.props.handleChange} placeholder={this.props.editedStep}
      value={this.props.editedStep}  />
    <input type="submit" value="Submit Edited Step" onSubmit={e => this.props.submitEditedStep(e,this.props.index, this.props.editedStep)} />
  </form>
</div>
)
}

}
