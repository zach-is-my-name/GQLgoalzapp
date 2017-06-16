/* eslint-disable */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class SelectGoalForm extends Component {
  render() {
    let goalDocs = this.props.goalDocs;
  const goalSelectInputValues = goalDocs.map((goalDoc, index) => {
      return <option value={goalDoc.id} key={goalDoc.id}>{goalDoc.goal}</option>
    });
      return (
        <form className="goal-select">
          <Field name="goalSelector" component="select"
            onChange={this.props.onSelect}>
            <option value={null} key={null}></option>
            {goalSelectInputValues}
          </Field>
        </form>
      )
        }
        }

        SelectGoalForm = reduxForm({form: 'goalSelectForm'})(SelectGoalForm);

        export default SelectGoalForm;
