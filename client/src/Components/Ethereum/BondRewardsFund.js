import React from 'react'
import '../../style/BondRewardsFund.css'

const BondRewardsFund = (props) => {
  return (
    <div className="text">
    <p> Bond Rewards Fund: {props.bondRewardsAmount}</p>
    </div>
  )
}

export default BondRewardsFund
