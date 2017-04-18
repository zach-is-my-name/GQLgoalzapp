import React from 'react';
import {gql, graphql} from 'react-apollo';

function GoalSelector({data: {loading, error, goals}}) {

console.log(goals);

if (!loading) {
const goalsDropDown =
goals.map((goal,index) => {
  return <option value={index} key={index}> {goal} </option>
})}}


const goalsFromDb = gql `
query {
  goalDocs {
    goal
  }
}`;

 const GoalSelectorData = graphql(goalsFromDb)(GoalSelector);

export default GoalSelectorData;
