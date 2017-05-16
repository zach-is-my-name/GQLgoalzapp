//  const userSchema = [`
//     type User {
//       id: ID!
//       userName: String
//       friends: [String]
//       interests: [String]
//     }
//
//     type Query {
//       users: [User]
// }
//
//     type Mutation {
//         createUser(input: UserInput): User
//         updateUser(id: ID!, input: UserInput): User
//     }
//
//     input UserInput {
//       userName : String
//       friends: String
//      interests: String
//    }
//
//    `]
//
// const userResolvers = {
//             users: async(args) => {
//                 const users = await User.find()
//
//                 console.log('users =', users)
//                 // return users
//                 return users.map(user => new UserType(user))
//             },
//             createUser: async(args) => {
//                 const user = await User
//                 .create(args.input)
//                 return new UserType(user);
//             }
//         }
//
// module.exports = {
//   userSchema,
//   userResolvers,
// }
