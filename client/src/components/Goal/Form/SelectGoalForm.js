/* eslint-disable */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class SelectGoalForm extends Component {
  render() {
    let goalDocs = this.props.goalDocs;

    const goalSelectInputValues = this.props.goalDocs.map((goalDoc, index) => {
      // console.log(goalDoc);
      return <option value={goalDoc.id} key={goalDoc.id}>{goalDoc.goal}</option>
    });


      return (<form className="goal-select">
        <Field name="goalSelector" component="select"
          onChange={this.props.onChange}>

          {goalSelectInputValues}
        </Field>
      </form>)
        }
        }
//dropdown doesn't update on GoalInput


        SelectGoalForm = reduxForm({form: 'goalSelectForm'})(SelectGoalForm);

        export default SelectGoalForm;
