/* eslint-disable */
import React from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'

import '../../style/TargetUser.css'

class TargetUser extends React.Component {
  constructor(props) {
    super(props)
    this.dispatchTargetUserName = this.dispatchTargetUserName.bind(this)
  }


dispatchTargetUserName(targetUserNeme) {
    this.props.dispatch(actions.setTargetUserName(targetUserNeme))
}

  render() {
    if(this.props.data){
    const {data: {loading, error, User}} = this.props
    if (!loading){
    if (User) {
    this.dispatchTargetUserName(User.userName)
    }
    return (
      <div className="target-user-wrapper">
        <p className="target-user-p">Target User: {User ? User.userName : null} </p>
      </div>
        )
    }
  }
  return null;
}}
  const mapStateToProps = (state, props) =>  {
    return ({
      targetUser: state.goals.targetUserID,
    })
  }

  const TargetUserWithState = connect(mapStateToProps)(TargetUser)

  const targetUserQuery = gql `
  query($targetUser: ID) {
  User(id:$targetUser) {
    userName
  }
}`


const TargetUserWithData = graphql(targetUserQuery,
{options: ({targetUser}) => ({variables: {targetUser}})}
)(TargetUserWithState)

export default connect(mapStateToProps)(TargetUserWithData);
