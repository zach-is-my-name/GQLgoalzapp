import React from 'react'
import { withAuth } from '@8base/react-sdk';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import {withRouter, Link} from 'react-router-dom';
import {withApollo } from 'react-apollo';
import {compose} from 'react-apollo';
import '../../style/MenuButton.css'

class MenuButton extends React.Component {
  constructor(props){
  super(props)
  this.handleSelection = this.handleSelection.bind(this)
}

handleSelection(value, event) {
}

  render() {
    const { auth, client } = this.props;
    const user = "user"
    return (
      <div className={`menu-button ${user}`}>
      <Wrapper className="menu-button" onSelection={this.handleSelection}>
        <Button className="menu-button-user-button">
          {this.props.loggedInUserName}
        </Button>
        <Menu className="menu-button-menu">
          <ul>
            <MenuItem className="menuitem-userfeed">
              <Link  className="menuitem-userfeed"to={`/userfeed/${this.props.loggedInUserId}`}>{this.props.loggedInUserName}</Link>
            </MenuItem>
            <MenuItem className="menuitem-logout">
              <li onClick={async () => {
          await client.clearStore();
          auth.authClient.logout();
        }}>Logout</li>
            </MenuItem>
          </ul>
        </Menu>
      </Wrapper>
      </div>
    )
  }
}

MenuButton = compose(withRouter, withAuth, withApollo)(MenuButton)

export default MenuButton
