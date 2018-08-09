import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions.js'

import '../../style/ZappButton.css'

 class ZappButton extends Component {

handleClick() {
  // this.props.dispatch(actions.mergeStepsClone())
}

  render () {
    return (
      <button className="zappbutton">
        Zapp!
      </button>
    )
  }
}
export default connect()(ZappButton)
