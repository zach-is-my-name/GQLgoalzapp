/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'

/* CLASS DECLARATION */
class CurrentUser extends Component {
  constructor(props) {
    super(props)

  }


/* RENDER METHOD */
    render () {
      if (this.props.data) {
        const { data: { loading, error, userDocByID } } = this.props;
        if (!loading){
          return(
            <p>Current User: {!this.props.id ?
            null : userDocByID.userName}</p>

          )
        }}
return null;
      }

      componentWillReceiveProps(nextProps) {
        if(nextProps.data && nextProps.data.loading == false) {
          // console.log('NEXTPROPS', nextProps.data.userDocByID)
          this.props.dispatch(actions.setUserDoc(nextProps.data.userDocByID))
      }}
    }

/* REDUX */
const mapStateToProps = (state, props) => {
  return {
    currentUser: state.users.currentUser,
    currentUserID: state.users.currentUserID,
    ownGoals: state.users.ownGoals,
  }
}



const CurrentUserWithState = connect(mapStateToProps)(CurrentUser);

/* GRAPHQL QUERY */

const FetchUserDocByID = gql `
query root($varID:String) {
  userDocByID(id:$varID) {
      id
      userName
  }
}
`;

const CurrentUserWithData = graphql(FetchUserDocByID, {
  skip: (props) => !props.id,
  options: ({id}) => ( {variables: {varID: id} })
})(CurrentUserWithState);

export default CurrentUserWithData;
