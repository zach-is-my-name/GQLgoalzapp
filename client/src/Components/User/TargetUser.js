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
    // this.dispatchTargetUserName = this.dispatchTargetUserName.bind(this)
  }

// dispatchTargetUserName(targetUserNeme) {
//     this.props.dispatch(actions.setTargetUserName(targetUserNeme))
// }

componentWillReceiveProps(nextProps) {
if (this.props !== nextProps && this.props.data.User) {
  this.props.dispatch(actions.setTargetUserName(nextProps.data.User.userName))
  }
}


  render() {
    if (!this.props.data.loading){

    return (
      <div className="target-user-wrapper">
        <p className="target-user-p">Target User: {this.props.data.User.userName} </p>
      </div>
        )
      }
      return null
    }
}
  const mapStateToProps = (state, props) =>  {
    return ({
      targetUser: state.goals.targetUserID,
    })
  }

  const TargetUserWithState = connect(mapStateToProps)(TargetUser)

  const targetUserQuery = gql `
  query targetUserQuery($targetUser: ID) {
  User(id:$targetUser) {
    userName
  }
}`


const TargetUserWithData = graphql(targetUserQuery,
{options: ({targetUser}) => ({variables: {targetUser}})}
)(TargetUserWithState)

export default connect(mapStateToProps)(TargetUserWithData);
