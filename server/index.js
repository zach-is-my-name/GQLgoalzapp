//import 'babel-polyfill';
const express = require('express');
//const HOST = process.env.HOST;
// const graphqlHTTP = require('express-graphql');
// const {buildSchema} = require('graphql');
// const config = require('./config');
// const mongoose = require('mongoose');


// const {executabaleSchema} = require('./schema')

// const schema = buildSchema(`
//   type Query {
//     goalDocs: [GoalDocType]
//     goalDocByID(id:String): GoalDocType
//     userDocs: [UserDocType]
//     userDocByID(id:String): UserDocType
// }
//
//   type UserDocType {
//     id: ID!
//     userName: String
//     ownGoals: [String]
//     }
//
//   type GoalDocType {
//     id: ID!
//     goal: String
//     steps: [String]
//     owner: [String]
//   }
//
//   type Mutation {
//     createGoalDoc(input:GoalDocInput): GoalDocType
//     updateGoalDoc(id:ID!, input: GoalDocInput): GoalDocType
//     createUserDoc(input: userDocInput): UserDocType
//     updateUserDoc(id: ID!, input: userDocInput):UserDocType
// }
//
//   input GoalDocInput {
//     goal: String
//     steps: String
//     owner: String
// }
//
//   input userDocInput {
//     userName : String
//     ownGoals: String
// }
//     `)

// class GoalDocPrototype {
//     constructor(goalDocCreate) {
//         this.id = goalDocCreate.id;
//         this.goal = goalDocCreate.goal
//         this.steps = goalDocCreate.steps
//         this.owner = goalDocCreate.owner
//     }
// }
//
// class UserType {
//     constructor(userCreate) {
//         this.id = userCreate.id
//         this.userName  = userCreate.userName
//         this.ownGoals = userCreate.ownGoals
//     }
// }
//
//
//
// const root = {
//   goalDocs: async(args) => {
//     try {
//       const goalDocQueryAll = await Goals.find();
//       // console.log(goalDocQueryAll);
//       return goalDocQueryAll.map(goalDocQueryAll => new GoalDocPrototype(goalDocQueryAll))
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({error: 'something went wrong'})
//     }
//   },
//
//   goalDocByID: async(args) => {
//     try {
//       const goalDocQueryByID = await Goals.findById(args.id);
//       // console.log(goalDocQueryByID);
//       return goalDocQueryByID;
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({error: 'something went wrong'})
//     }
//   },
//
//   createGoalDoc: async(args) => {
//     try {
//       // console.log('console.log(args.input) =', args.input)
//       const GoalDocInputObj = args.input;
//       console.log('ARGS.INPUT', GoalDocInputObj)
//       const goalDocCreate = await Goals.create(GoalDocInputObj);
//       console.log('ASYNC DB INSERT OBJECT', goalDocCreate)
//       return new GoalDocPrototype(goalDocCreate);
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({error: 'something went wrong'})
//     }
//   },
//
//   updateGoalDoc: async(args) => {
//     try {
//       let argsArr = [args.input.steps]
//       console.log('ARGS INPUT STEPS', args.input.steps)
//       console.log('ARGS INPUT (current)', args.input)
//       console.log('ARGS ARR', argsArr)
//       const goalDocUpdate = await Goals.findByIdAndUpdate(args.id, {
//         $push: {
//           steps: argsArr
//         }
//       }, {new: true});
//       return new GoalDocPrototype(goalDocUpdate);
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({error: 'something went wrong'})
//     }
//   },
//
//   userDocs: async(args) => {
//     try {
//     const users = await User.find()
//     // console.log('USERS', users)
//     return users.map(user => new UserType(user))
//   } catch(err) {
//     console.error(err);
//     return res.status(500).json({error: 'something went wrong'})
//   }},
//
//   userDocByID: async(args) => {
//     try {
//       const userDocQueryByID = await User.findById(args.id);
//       console.log(userDocQueryByID);
//       return userDocQueryByID;
//     } catch(err) {
//       console.error(err);
//       return res.status(500).json({error: 'something went wrong'})
//     }
//   },
//
//   createUserDoc: async(args) => {
//     try {
//     const userDocInputObj = args.input;
//     console.log('ARGS.INPUT', userDocInputObj)
//     const userDocCreate =  await User.create(userDocInputObj)
//     return new UserType(userDocCreate);
//   } catch(err) {
//     console.error(err);
//     return res.status(500).json({error: 'something went wrong'})
//     }
//   },

  // updateUserDoc: async(args) => {
  //   try {
  //
  //   }
  // }

// }

// app.use('/graphql', graphqlHTTP({schema, graphiql: true, rootValue: root})))
const app = express();

// app.use('/graphql', graphqlHTTP(request => {
//   return {schema, graphiql: true, rootValue: root}
// }));

app.get(`/api`, (req, res) => res.send('Got the api endpoint'));

app.use(express.static(config.CLIENT_ROOT));
//

// Model.findByIdAndUpdate(id, { $set: { name: 'jason borne' }}, options, callback)
//
//Enable CORS for development

let server;
function runServer(dbUrl, host, port = 3001) {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, host, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      }).on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}
console.log(`1 Server running on ${config.ROOT}`);

if (require.main === module) {
  runServer(config.DB_URL, config.HOST, config.PORT);
}
module.exports = {
  app,
  runServer
};
