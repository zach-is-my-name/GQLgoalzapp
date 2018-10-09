/* eslint-disable */
import React, {Component} from 'react';
import EditStep from './EditStep.js'
import {RIEInput} from '@attently/riek'
import '../../style/EditStepSmart.css'

export default class EditStepSmart extends Component {
constructor(props) {
  super(props)
  this._submitEditedStep = this._submitEditedStep.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.state = {
    editedStep: props.stepObj.step,
  }
}

  handleChange(obj) {
      console.log(obj)
      // this.setState({editedStep: e.target.stepObj})
          }

 _submitEditedStep() {

 }

render() {
 return (
     <RIEInput
       value={this.props.stepObj.step}
       propName={"editedStep"}
       change={this.handleChange}
       selectAll={false}
       classEditing="editing-input"
     />
       )
     }

     }


   // <EditStep
   //   _submitEditedStep={this._submitEditedStep}
   //   handleChange={this.handleChange}
   //   value={this.state.editedStep}
   // />
