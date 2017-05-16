// const { makeExecutableSchema } = require('graphql-tools');
// const {merge} =require('lodash');
//
// // const  {userSchema} = require('./User_Management/schema.js');
// // const  {userResolvers} = require('./User_Management/schema.js');
//
// const rootSchema = [`
// schema {
//     query: Query
//     mutation: Mutation
//   }
//
//   type User {
//     id: ID!
//     userName: String
//     friends: [String]
//     interests: [String]
//     }
//
//    type Query {
//     goalDocs: [GoalDocType]
//     goalDocByID(id:String): GoalDocType
//     users: [User]
// }
//
//   type GoalDocType {
//     id: ID!
//     goal: String
//     steps: [String]
//   }
//
//   input GoalDocInput {
//     goal: String
//     steps: String
// }
//    type Mutation {
//     createGoalDoc(input:GoalDocInput): GoalDocType
//     updateGoalDoc(id:ID!, input: GoalDocInput): GoalDocType
// }
//
//
//   extend type Mutation {
//     createUser(input: UserInput): User
//     updateUser(id: ID!, input: UserInput): User
//     }
//
//   input UserInput {
//     userName : String
//     friends: String
//     interests: String
//    }
//    `]
//
//
// const rootResolvers = {
//     goalDocs: async(args) => {
//         try {
//             const goalDocQueryAll = await Goals.find();
//               // console.log(goalDocQueryAll);
//             return goalDocQueryAll.map(goalDocQueryAll => new GoalDocPrototype(goalDocQueryAll))
//         } catch (err) {
//             console.error(err);
//             return res.status(500).json({error: 'something went wrong'})
//         }
//     },
//
//     goalDocByID: async(args) => {
//     try {
//       const goalDocQueryByID = await Goals.findById(args.id);
//         // console.log(goalDocQueryByID);
//       return goalDocQueryByID
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({error: 'something went wrong'})
//         }
//     },
//
//     createGoalDoc: async(args) => {
//         try {
//             // console.log('console.log(args.input) =', args.input)
//             const GoalDocInputObj = args.input;
//             console.log('ARGS.INPUT', GoalDocInputObj)
//             const goalDocCreate = await Goals.create(GoalDocInputObj);
//             console.log('ASYNC DB INSERT OBJECT', goalDocCreate)
//             return new GoalDocPrototype(goalDocCreate);
//         } catch (err) {
//             console.error(err);
//             return res.status(500).json({error: 'something went wrong'})
//         }
//     },
//     updateGoalDoc: async(args) => {
//         try {
//             let argsArr = [args.input.steps]
//             console.log('ARGS INPUT STEPS', args.input.steps )
//             console.log('ARGS INPUT (current)', args.input )
//             console.log('ARGS ARR', argsArr)
//             const goalDocUpdate = await Goals.findByIdAndUpdate(args.id,
//                 {$push: {steps: argsArr }},
//              {new: true});
//             return new GoalDocPrototype(goalDocUpdate);
//         } catch (err) {
//           console.error(err);
//           return res.status(500).json({error: 'something went wrong'})
//     }},
//   users: async(args) => {
//           const users = await User.find()
//
//           console.log('users =', users)
//           // return users
//           return users.map(user => new UserType(user))
//       },
// createUser: async(args) => {
//           const user = await User
//                 .create(args.input)
//                 return new UserType(user);
//             }
//           }
//
// // const combinedSchemas = [...rootSchema, ...userSchema];
//
// // const resolvers = merge(rootResolvers, userResolvers);
//
// const executabaleSchema = makeExecutableSchema({
//   typeDefs: rootSchema,
//   // resolvers
// rootResolvers
// });
//
// 
// module.exports = {
//   executabaleSchema
// }
