
import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

function GoalSelector({data: {loading, error, goalDocs}}) {

if (loading) {
console.log('loading:',true);
console.log('HIT')
}

if (error) {
  console.log(error.message);
}

if (goalDocs)
console.log('yes');
console.log(goalDocs);
return <p>testing</p>

}


const GoalQuery = gql`
query  {
  goalDocs {
    goal
  }
}
`;

const GoalSelectorData = graphql(GoalQuery)(GoalSelector);
export default GoalSelectorData;

// if (!loading) {
// const goalsDropDown =
// goals.map((goal,index) => {
//   return <option value={index} key={index}> {goal} </option>
// })}
