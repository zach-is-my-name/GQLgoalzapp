import React from 'react';
import {gql, graphql} from 'react-apollo';

function GoalSelector({data: {loading, error, goal}}) {

if (!loading){
console.error(error);
console.log(goal);
}

return <p>test</p>
}

const goalQuery = gql`
query	{
  goalDocs {
    goal
  }
}
`;

const GoalSelectorData = graphql(goalQuery)(GoalSelector);
export default GoalSelectorData;

// if (!loading) {
// const goalsDropDown =
// goals.map((goal,index) => {
//   return <option value={index} key={index}> {goal} </option>
// })}



// export default GoalSelectorData;
