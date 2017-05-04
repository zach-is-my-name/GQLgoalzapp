import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class StepInputForm extends Component {
  render() {
    return(
    <form onSubmit={this.props.onSubmit} >
      <Field name="stepInput" component="input" type="text">

      </Field>
    </form>
    }
  )}
    StepInputForm = reduxForm({form: 'stepInputForm'})(stepInputForm)

    export default StepInputForm;
