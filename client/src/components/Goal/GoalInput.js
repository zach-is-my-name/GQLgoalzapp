import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions'


/*Class Declaration */
 class GoalInput extends React.Component {
    constructor(props) {
        super(props)
    this.submitGoal = this.submitGoal.bind(this);
    this.state = {
      varGoal : ''
    }
    }
// Original Attempt this.props.mutate({variables: {createGoalDoc: mutateArg } })
//      this.props.mutate({variables: mutateArg})
/* Event Handler*/

submitGoal(event)  {
  event.preventDefault()
  const {varGoal} = this.state;
  // const mutateArg =  {varGoaldoc: {goal: varGoal}}
    this.props.inputGoal(varGoal)
    .then(({data}) => {
      /*Action Dispatch */
      this.props.dispatch(actions.setGoal(data.createGoalDoc))
    })}


//you can probably dispatch setGoal with the returned value of the mutation (which
// should include an id and the goal
    render() {
        const input = <form className="goal-input" onSubmit={this.submitGoal}>
          <input type="text" id="form-text" placeholder="Your Goal"
            onChange={(e)=> this.setState({varGoal: e.target.value})}/>
          <input type="submit" name="submit step" value="ZappIt"/>
        </form>

        return (input);
    }}


/*GraphQL Query */

const goalInputMutation = gql `mutation($varGoal: String) {
  createGoalDoc(goal:$varGoal) {
    goal
    id
  }
}`

// gql`
//     mutation ($varGoaldoc: GoalDocInput) {
//   createGoalDoc(input: $varGoaldoc) {
//     goal
//     id
//     steps
//   }
// }
// `

const GoalInputWithData = graphql(goalInputMutation,
{
    props: ({mutate}) => ({
      inputGoal(goal, steps) {
        return mutate({
          variables: {goal:goal}
        })
    .catch((error) => {
      console.log('there was an error sending the query', error);
    })
}
})
})(GoalInput);

/*Redux */
const mapStateToProps = (state, props) => {
  return {
    currentGoal: state.currentGoal
  }
}

export default connect(mapStateToProps)(GoalInputWithData)
