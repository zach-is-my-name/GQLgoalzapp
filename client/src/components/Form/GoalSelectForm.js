import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class GoalSelectForm extends Component {
  render() {
    let goalDocs = this.props.goalDocs;


    const goalSelectInputValues = this.props.goalDocs.map((goalDoc, index) => {
      return <option value={goalDoc.goal} key={index}>{goalDoc.goal}</option>
    });


      return (<form className="goal-select">
        <Field name="goalSelector" component="select"
          onChange={this.props.onChange}>
          {goalSelectInputValues}
        </Field>
      </form>)
        }
        }

        GoalSelectForm = reduxForm({form: 'goalSelectForm'})(GoalSelectForm);

        export default GoalSelectForm;
