import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'
import * as actions from '../../Actions/actions'
import '../../style/InputGoal.css'

/*Class Declaration */
 class InputGoal extends React.Component {
    constructor(props) {
        super(props)
    this.handleChange = this.handleChange.bind(this);
    this.submitGoal = this.submitGoal.bind(this);
    this.state = {
      goal : ''
    }
    }

/* Event Handler*/
submitGoal(event)  {
  event.preventDefault()
  const {goal} = this.state;
  this.setState({goal:''})
  const ownersId = this.props.loggedInUserID
    this.props.inputGoal({variables: { goal, ownersId }} )
    .catch((error) => {
      console.log('there was an error sending the query', error)
    })
    .then(({data}) => {
      console.log("Mutation Sent!")
      /*Action Dispatch */
      this.props.dispatch(actions.setGoal(data.createGoalDoc))
    })}

handleChange(e) {
  this.setState({goal: e.target.value });
    }

    render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    // redirect if no user is logged in
    if (!this.props.data.user) {
      console.warn('only logged in users can create new posts')
      return (
        <Redirect to={{
          pathname: '/'
        }}/>
      )
    }
        const input =
        <div className="goalinput-form">
          <form onSubmit={this.submitGoal}>
            <input type="text" id="form-text" placeholder=""
              onChange={this.handleChange}
              value={this.state.goal}/>
            <input type="submit" value="ZappIt"/>
          </form>
        </div>
          if (this.props.loggedInUserID === this.props.targetUserIDID) {
     return (input)
   }
      return (null)
    }}

/* GraphQL */

const goalInputMutation = gql `mutation goalInputMutation($goal: String, $ownersId: ID) {
  createGoalDoc(goal:$goal, ownersId: $ownersId ) {
    goal
    id
  }
}`

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

const InputGoalWithData = graphql(userQuery,
{ options: {fetchPolicy: 'network-only'}})(graphql(goalInputMutation,{
  props: ({mutate}) => ({
    inputGoal({variables}) {
      return mutate({
        variables: {...variables}
      })
      .catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }
  })
})(withRouter(InputGoal)));

/*Redux */
const mapStateToProps = (state, props) => {
  return {
    currentGoal: state.currentGoal,
    loggedInUserID: state.goals.loggedInUserID,
    targetUserIDID: state.goals.targetUserID,
  }
}

export default connect(mapStateToProps)(InputGoalWithData)
