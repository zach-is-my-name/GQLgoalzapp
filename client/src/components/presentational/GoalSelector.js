import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const GoalQuery = gql `
query root {
  goalDocs {
    goal
  }
}
`;

class GoalSelector extends React.Component {
  constructor(props){
  super(props)
  this.selectGoal = this.selectGoal.bind(this);
  // this.state = {currentGoal: ''};
}
    // if (loading) {
    //   return <div>Loading</div>;
    // } else {
    //   return (
    //     <ul>
    //       {goalDocs.map(goal =>
    //         <li>
    //           {goal}
    //         </li>
    //       )}
    //     </ul>
    //   );
    // }
  selectGoal (event) {
  this.setState({value: event.target.value});
  this.state = {value: 'select a goal..'}
  }


render() {
  const {data:{ loading, error, goalDocs} } = this.props;
if (loading){
        return <div>loading...</div>;
      }
        else if (error) {
          return <p>Error!</p>
        } else {
        // console.log(this.props.data.goalDocs);

      let  goalDocs = this.props.data.goalDocs;

        const goalSelectInputValues = this.props.data.goalDocs.map((goal, index) => {
          return   <option value={this.props.data.goalDocs.goal} key={index}>{goal.goal}</option>
        });

        const goalSelectInput = <form className="goal-select">
          <select value={this.props.data.goalDocs.goal} onSelect={this.selectGoal}>
            {goalSelectInputValues}
          </select>
        </form>

        // console.log(this.props.data.goalDocs.map(goal => goal))
        return (goalSelectInput)
}
}
}

export default  graphql(GoalQuery)(GoalSelector);
