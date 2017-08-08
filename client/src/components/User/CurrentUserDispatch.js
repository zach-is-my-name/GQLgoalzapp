/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions'

class CurrentUserDispatch extends Component {
componentWillMount() {
    this.props.dispatch(actions.setCurrentUserName(this.props.currentUser))
}
render() {
    return null
}}
export default connect()(CurrentUserDispatch);
