import React from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class TargetUser extends React.Component {
  render() {
    if(this.props.data){
    const {data: {loading, error, User}} = this.props
    if (!loading){
    return (
      <div>
        <p>Target User: {User ? User.userName : null} </p>
      </div>
        )
    }
  }
  return null;
}}
  const mapStateToProps = (state, props) =>  {
    return ({
      targetUser: state.goals.targetUser,
    })
  }

  const TargetUserWithState = connect(mapStateToProps)(TargetUser)

  const TargetUserQuery = gql `
  query($targetUser: ID) {
  User(id:$targetUser) {
    userName
  }
}`


const TargetUserWithData = graphql(TargetUserQuery,
{options: ({targetUser}) => ({variables: {targetUser}})}
)(TargetUserWithState)

export default connect(mapStateToProps)(TargetUserWithData);
