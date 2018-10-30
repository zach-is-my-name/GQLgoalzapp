/* eslint-disable */
import React, {Component} from 'react';
import '../../../style/SelectGoalForm.css'

class SelectGoalForm extends Component {
  render() {
    // console.log('form', this.props)

    const goalSelectInputValues = this.props.goalDocs.map((goalDoc, index) => {
      return <option value={goalDoc.id} key={goalDoc.id}>{goalDoc.goal}</option>
    });

      return (
        <form className="goal-select">
          <select value={this.props.value} onChange={this.props.handleChange}>
            <option value={null} key={null}></option>
            {goalSelectInputValues}
          </select>
          {/* </Field> */}
        </form>
      )
        }
        }

        // SelectGoalForm = reduxForm({form: 'goalSelectForm'})(SelectGoalForm);

        export default SelectGoalForm;
