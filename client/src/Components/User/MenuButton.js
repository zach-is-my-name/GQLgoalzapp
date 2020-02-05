import React from 'react'
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import {withRouter, Link} from 'react-router-dom';
import '../../style/MenuButton.css'

class MenuButton extends React.Component {
  constructor(props){
  super(props)
  this.handleSelection = this.handleSelection.bind(this)
}

handleSelection(value, event) {
  console.log('handleSeleciton event', event)
  console.log('value', value)
}

  render() {
    return (
      <Wrapper className="menu-button" onSelection={this.handleSelection}>
        <Button className="menu-button-user-button">
          {this.props.currentUser}
        </Button>
        <Menu className="menu-button-menu">
          <ul>
            <MenuItem className="menuitem-userfeed">
              <Link  className="menuitem-userfeed"to={`/userfeed/${this.props.currentUserId}`}>{this.props.currentUser}</Link>
            </MenuItem>
            <MenuItem className="menuitem-logout">
              <li onClick={this.props.logout}>Logout</li>
            </MenuItem>
          </ul>
        </Menu>
      </Wrapper>
    )
  }
}

export default withRouter(MenuButton)
