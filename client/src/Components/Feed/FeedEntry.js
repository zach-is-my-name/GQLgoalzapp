import React from 'react';
import '../../style/FeedEntry.css'
import {Link} from 'react-router-dom'

const FeedEntry = ({entry}) => {
  // console.log(entry)
const {goal} = entry
const owner = entry.owners === null ? 'anonymous': entry.owners.userName
// console.log('entry', entry)
// console.log('goal',goal)
// console.log('owner', owner)
// console.log(owner);
// console.log( entry.owners.userName !== null ? `username is ${entry.owners.userName}` :`no username`)
return (
<div>
  {`${goal} ........ `} <span className="feed-entry-owner">  {`${owner}`} </span>
  <span className="feed-entry-text-zapped-goal"> {`zapped goal`} </span>
  <Link to={`/userfeed/${entry.owners.id}/${entry.id}`}>
    <span className="feed-entry-goal"> {`${goal}`} </span>
    </Link >
  </div>
    )
    }
//http://localhost:3000/userfeed/zach%20michaels/New%20Goal
export default FeedEntry
