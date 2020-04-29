import React from 'react';

const UserTokenFunds = (props) => {
  console.log(props.tokenBalance)
  return (
    <div className="text">
    <p>Token Balance: {props.tokenBalance} </p>
    </div>
  )
}

export default UserTokenFunds;
