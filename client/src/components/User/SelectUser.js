/* eslint-disable */
/*Need to make User Reducer */
import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import {connect} from 'react-redux';

import SelectUserForm from './Form/SelectUserForm'
import CurrentUser from './CurrentUser'

/* CLASS DECLARATION */
class SelectUser extends Component {
  constructor(props) {
    super(props)
    this.selectUser = this.selectUser.bind(this);
  }

/* EVENT HANDLER */
  selectUser = (values) => {
    // console.log(values.userSelector);
    event.preventDefault();
/* ACTION DISPATCH */
    this.props.dispatch(actions.setUserDocID(values.userSelector))
  }


/* RENDER METHOD */
  render() {
    const { data: {loading, error, userDocs}} = this.props


if (loading) {
  return <div>loading...</div>;
} else if (error) {
  return <p>Error!</p>
} else {
  return (
    <div>
      <SelectUserForm userDocs={this.props.data.userDocs} onChange={this.selectUser} />
      <CurrentUser id={this.props.currentUserID} />
    </div>
  )
}
}}

/* GRAPHQL QUERY */
const UserQuery = gql `
query {
  userDocs {
    id
    userName
  }
}`;

const ComponentWithData = graphql(UserQuery)(SelectUser);


/* REDUX */
const mapStateToProps = (state, props) => {
  return {
    currentUser: state.users.currentUser,
    currentUserID: state.users.currentUserID
  }
}

export default connect(mapStateToProps)(ComponentWithData)
