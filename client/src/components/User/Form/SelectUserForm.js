/* eslint-disable */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class SelectUserForm extends Component {
  render() {

    const userSelectInputValues = this.props.userDocs.map((userDoc, index) => {
      // console.log(userDoc);
      return <option value={userDoc.id} key={userDoc.id}>{userDoc.userName}</option>
    });

      return ( <form className="user-select">
        <Field name="userSelector" component="select"
          onChange={this.props.onChange}>
          {userSelectInputValues}
        </Field>
      </form>)
    }
    }

      SelectUserForm = reduxForm({form: 'userSelectForm'})(SelectUserForm);

      export default SelectUserForm;
