import React from 'react'
import '../../style/ContractRewardsFund.css'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");


const ContractRewardsFund = (props) => {
  return(
    <div className="contract-rewards">
    <p>Rewards Fund Balance: {props.rewardsAmount} </p>
    </div>
  )
}

export default ContractRewardsFund
