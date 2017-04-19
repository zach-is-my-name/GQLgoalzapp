import React from 'react';
import {gql, graphql} from 'react-apollo';


export default graphql(gql`
query	{
  goalDocs {
    goal
  }
}
`)(GoalSelector);

function GoalSelector({data: {loading, error, goal}}) {

if (!loading)
console.log(error);
console.log(goal);

return <p>test</p>


// if (!loading) {
// const goalsDropDown =
// goals.map((goal,index) => {
//   return <option value={index} key={index}> {goal} </option>
// })}
}


// const GoalSelectorData = graphql(goalsFromDb)(GoalSelector);
// export default GoalSelectorData;
