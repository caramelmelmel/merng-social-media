import React, { useContext, useState } from 'react'
import { Menu} from 'semantic-ui-react'
//important to use if not router click doesn't work
import {Link} from 'react-router-dom'

import {AuthContext} from '../context/auth'

function MenuBar(){
  const {user, logout} = useContext(AuthContext)
  const pathname = window.location.pathname

  //important here as the highlight matters here when changing routes
  //KEY TRICK use path 
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name)

  //when login vs when not logged in
    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item name={user.username} active as={Link} to="/"/>
            <Menu.Menu position="right">
                <Menu.Item name="logout" onClick={logout}/>
            </Menu.Menu>
        </Menu>): (
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
        
          <Menu.Menu position='right'>
          <Menu.Item
            name='Login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
            <Menu.Item
              name='Register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>

    )
    return menuBar
}

export default MenuBar
