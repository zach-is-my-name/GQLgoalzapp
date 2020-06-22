import React from 'react'
import goalzapptokensystem from '../../abi/GoalZappTokenSystem.json'
import * as DeployedAddress from '../../ContractAddress.js'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
let accounts = web3.eth.getAccounts()
let selectedAddress;
const GoalZappTokenSystem = new web3.eth.Contract(goalzapptokensystem.abi, DeployedAddress.GOALZAPPTOKENSYSTEM )

class SellTokens extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      formValue: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
   this.setState({formValue: event.target.value});
 }

 async handleSubmit(event) {
  event.preventDefault()
  let result = await GoalZappTokenSystem.methods.sell(this.state.formValue).send({from: selectedAddress})
  console.log(result)
  let tokenBalance = await GoalZappTokenSystem.methods.balanceOf(window.ethereum.selectedAddress).call()
  this.props.setUserTokenBalance(tokenBalance)
 }

async componentDidMount() {
  selectedAddress = window.ethereum.selectedAddress;
  console.log(selectedAddress)
  try {
    const accounts = await window.ethereum.enable()
    // You now have an array of accounts!
    // Currently only ever one:
    // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']

  } catch (error) {
  // Handle error. Likely the user rejected the login
  console.error(error)
  }
}

  render() {
    return (
       <form onSubmit={this.handleSubmit}>
        <label>
          Amount to Sell :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Sell" />
      </form>
    )
  }
}

export default SellTokens
