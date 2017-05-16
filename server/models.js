const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;


const goalSchema = mongoose.Schema({
    goal: String,
    steps:{type: Array} ,
    owner: [ObjectID]
})

const userSchema = mongoose.Schema({
    //id: _id,
    userName: String,
    goalDocRefs: [ObjectID]
})

const User = mongoose.model('User', userSchema);
const Goals = mongoose.model('Goals', goalSchema);

module.exports = {
    User,
    Goals
};
