/**
 * This file was generated using 8base CLI.
 * 
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 * 
 * https://docs.8base.com/8base-console/custom-functions/resolvers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    updateOrCreateStep:
 *      ...
 * 
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local updateOrCreateStep -p src/resolvers/updateOrCreateStep/mocks/request.json
 */

import gql from 'graphql-tag';

const stepQuery = gql`
query stepQuery($id: ID!) {
  step(id: $id) {
    id
  }
}
`;

const updateStep = gql `mutation updateStep($id: ID!, $positionIndex: Int) {
  stepUpdate(data: {id: $id, positionIndex: $positionIndex}) {
    id
    positionIndex
    step
    goalDoc {
      goalDocOfStep {
        items {
          id
        }
      }
    }
  }
}
`
const createStep = gql `
mutation createStep($step: String!, $positionIndex: Int, $goalDocId: ID!) {
  stepCreate(data: {step: $step, 
    positionIndex: $positionIndex, 
    suggestedStep: false, 
    goalDoc: {connect: {id: $goalDocId}}}) {
    id
    step
    positionIndex
    goalDoc {
      id
    }
  }
}
`

module.exports = async (event, ctx) => {
  let response = null;

  try {
    response = await ctx.api.gqlRequest(stepQuery, { id: event.data.id });
    console.log("response == ", response)
    if (reponse.step.id) {
      const updateResponse = await ctx.api.gqlRequest(
        updateStep, {
          id: event.data.id, 
          positionIndex: event.data.positionIndex,
          goalDocId: event.data.goalDocId,
        }) 
        console.log("updateResponse== ", updateResponse)
    } else {
      const createResponse = await ctx.api.gqlRequest(
        createStep, {
          step: event.data.step, 
          positionIndex: event.data.positionIndex, 
          goalDocId: event.data.goalDocId, 
          suggestedStep: false  
          })
        console.log("createResponse== ", createResponse)
    }
  } catch (e) {
    return { data: { success: false }};
  }
  return { data: { success: true } };
};
