import React from 'react';
import {connect} from 'react-redux';

class SuggestStep extends React.Component {
  constructor(props) {
  super()
  this.handleChange = this.handleChange.bind(this)
  // this.sumit
  this.state =  {
    suggestedStep: ""
}}

  handleChange (e) {
    this.setState({step: e.target.value});
}

  render() {
  const input =
  <form onSubmit={this.submitSuggestedStep}>
    <input type="text" onChange={this.handleChange} placeholder=""
      value={this.state.suggestedStep}/>
    <input type="submit" value="Suggest Step"/>
  </form>

if (this.props.loggedInUserID !== this.props.targetUser) {
return (<div> <h4>Suggested Steps</h4> {input} </div>)
  }
return null
}}

const mapStateToProps = (state,props) => {
  return {loggedInUserID: state.goals.loggedInUserID,
    targetUser: state.goals.targetUser,}
}

export default connect(mapStateToProps)(SuggestStep);
