import React from 'react';
import {gql, graphql} from 'react-apollo';

export defualt function GoalSelector({data: {loading, error, goals}}) {

const goalsDropDown = goals.map((goal,index) => {
  return <option value={index} key={index}> {goal} </option>
})
  }
