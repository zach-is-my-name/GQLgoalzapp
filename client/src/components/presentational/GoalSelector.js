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

function GoalSelector({
    data: {
        loading,
        error,
        goalDocs
    }
}) {
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
    const selectGoal = event => console.log(this.refs.select.value);

if (loading){
        return <div>loading...</div>;
      } else {
        const goalSelectInputValues = goalDocs.map((goal, index) => {
          return   <option value={index} key={index}>{goal.goal}</option>
        });

        const goalSelectInput = <form className="goal-select" >
          <select ref="select" onChange={selectGoal}>
            {goalSelectInputValues}
              </select>
              </form>

        console.log(goalDocs.map(goal => goal))
        return (goalSelectInput)
}
}


const GoalSelectorData = graphql(GoalQuery)(GoalSelector);
export default GoalSelectorData;
