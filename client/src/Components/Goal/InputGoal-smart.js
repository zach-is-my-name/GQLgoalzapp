import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom'
import '../../style/InputGoal.css'

const goalInputMutation = gql `mutation goalInputMutation($goal: String, $ownersId: ID) {
  createGoalDoc(goal:$goal, ownersId: $ownersId ) {
    goal
    id
  }
}`

 class InputGoalSmart extends React.Component {
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
  const ownersId = this.props.loggedInUserId
    this.props.inputGoal({variables: { goal, ownersId}}).then(
      ({data}) => this.props._setGoalDocIdOnCreate(data.createGoalDoc.id)
    )
    .catch((error) => {
      console.log('there was an error sending the query', error)
    })
 }

handleChange(e) {
  this.setState({goal: e.target.value });
    }

    render() {
        return (
        <div className="goalinput-form">
          <form onSubmit={this.submitGoal}>
            <input type="text" id="form-text" placeholder=""
              onChange={this.handleChange}
              value={this.state.goal}/>
            <input type="submit" value="ZappIt"/>
          </form>
        </div>
        )
    }
  }

const InputGoalWithData =
graphql(goalInputMutation,{
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
})(InputGoalSmart)


export default InputGoalWithData
