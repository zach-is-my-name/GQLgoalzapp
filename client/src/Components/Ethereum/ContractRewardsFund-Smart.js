import React from 'react'
import ContractRewardsFund from './ContractRewardsFund.js'
import goalescrow from '../../abi/GoalEscrowTestVersion.json'
import * as DeployedAddress from '../../ContractAddress.js'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
let ProxiedGoalEscrow

if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) {
  // Web3 browser user detected. You can now use the provider.
  const provider = window['ethereum'] || window.web3.currentProvider
}


class ContractRewardsFundSmart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rewardsAmount: null
    }
  }

  async componentDidMount() {
    ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.props.proxyAddress)
    const rewardsAmount = await ProxiedGoalEscrow.methods.rewardFunds().call()
    this.setState({rewardsAmount})
   }

 async componentDidUpdate(prevProps) {
  if (this.props.proxyAddress && prevProps.proxyAddress !== this.props.proxyAddress) {
    ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.props.proxyAddress)
    const rewardsAmount = await ProxiedGoalEscrow.methods.rewardFunds().call()
    this.setState({rewardsAmount})
  }
 }

   render() {
  return (
    <div>
    {this.state.rewardsAmount ? <ContractRewardsFund rewardsAmount={web3.utils.fromWei(this.state.rewardsAmount)} /> : null }
    </div>
  )
   }
}

export default ContractRewardsFundSmart
