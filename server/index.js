//import 'babel-polyfill';
const express = require('express');
//const HOST = process.env.HOST;
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const config = require('./config');
const mongoose = require('mongoose');
const {Goals} = require('./models');

// app.use('/graphql', graphqlHTTP({schema, graphiql: true, rootValue: root})))


const app = express();

app.use('/graphql', graphqlHTTP(request =>{
   return {
   schema: schema,
   graphiql: true,
   rootValue: root
} }));

// app.use('/graphql', graphqlHTTP({
//   schema: MyGraphQLSchema,
//   graphiql: true
// }));


app.get(`/api`,(req, res) => res.send('Got the api endpoint'));

app.use(express.static(config.CLIENT_ROOT));

const schema = buildSchema(`

  type Query {
    goalDocs:[GoalDocType]
}

  type GoalDocType {
    id: ID!,
    goal: String,
    steps: [String],
  }

  type Mutation {
    createGoalDoc(input:GoalDocInput): GoalDocType
    updateGoalDoc(id:ID!, input: GoalDocInput): GoalDocType
}


  input GoalDocInput {
    goal: String,
    steps: String
}
`)

class GoalDocPrototype {
  constructor(goalDocCreate) {
    this.id  = goalDocCreate.id;
    this.goal = goalDocCreate.goal
    this.steps = goalDocCreate.steps
  }
}


const root = {
    goalDocs:  async (args) => {
    try {
      const goalDocQueryAll = await Goals.find();
      return goalDocQueryAll.map(goalDocQueryAll => new GoalDocPrototype(goalDocQueryAll))
      }

    catch(err) {
      console.error(err);
      return res.status(500).json({error:'something went wrong'})
      }
},
  createGoalDoc: async(args) => {
    try{
      // console.log('console.log(args.input) =', args.input)
      const GoalDocInputObj = args.input;
      const goalDocCreate = await Goals.create(GoalDocInputObj);
      return new GoalDocPrototype(goalDocCreate);
  }
  catch(err){
    console.error(err);
    return res.status(500).json({error:'something went wrong'})
  }
},
  updateGoalDoc: async(args) =>  {
   const goalDocUpdate = await Goals.findByIdAndUpdate(args.id,{ $set: args.input}, {new:true});
   return new GoalDocPrototype(goalDocUpdate);
}}
// Model.findByIdAndUpdate(id, { $set: { name: 'jason borne' }}, options, callback)

//Enable CORS for development






let server;
function runServer(dbUrl, host, port=3001) {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, host, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
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
  app, runServer,
};
