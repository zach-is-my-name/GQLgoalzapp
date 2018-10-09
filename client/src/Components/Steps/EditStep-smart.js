/* eslint-disable */
import React, {Component} from 'react';
import EditStep from './EditStep.js'

export default class EditStepSmart extends Component {
constructor(props) {
  super(props)
  this._submitEditedStep = this._submitEditedStep.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.state = {
    editedStep: props.stepObj.step,
  }
}

  handleChange(e) {
      this.setState({editedStep: e.target.stepObj})
          }

 _submitEditedStep() {
   
 }

render() {
 return (
   <EditStep
     _submitEditedStep={this._submitEditedStep}
     handleChange={this.handleChange}
     value={this.state.editedStep}
   />
     )
     }

     }
