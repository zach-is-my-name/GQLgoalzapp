const mongoose = require('mongoose');


const goalSchema = mongoose.Schema({
    goal: String, steps: [String],
    // owner: ObjectId
})

// const User = mongoose.model('User', userSchema);
const Goals = mongoose.model('Goals', goalSchema);

module.exports = {
    // User,
    Goals
};
