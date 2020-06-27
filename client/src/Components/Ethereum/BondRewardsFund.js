import React from 'react'
import '../../style/BondRewardsFund.css'

const BondRewardsFund = (props) => {
  return (
    <div className="text">
    <p> Bond Rewards Fund: {props.bondsAmount}</p>
    </div>
  )
}

export default BondRewardsFund
