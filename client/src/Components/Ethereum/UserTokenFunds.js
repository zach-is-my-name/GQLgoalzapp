import React from 'react';

const UserTokenFunds = (props) => {
  const {userTokenBalance} = props
  return (
    <div className="userTokenFunds">
    <p>Token Balance: {Math.round(userTokenBalance * Math.pow(10, 2))/ Math.pow(10, 2)} </p>
    </div>
  )
}

export default UserTokenFunds;
