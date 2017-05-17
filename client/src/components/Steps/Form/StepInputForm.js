/* eslint-disable */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class StepInputForm extends Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <form  onSubmit={handleSubmit}>
        <Field name="stepInput" component="input" type="text"/>
        <button type="submit">
          Suggest a Step
        </button>
      </form>
        )}}

 StepInputForm = reduxForm({
   form : 'stepInputForm'
 })(StepInputForm)
 export default StepInputForm
