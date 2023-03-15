import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
const NavItem = styled.li`
  list-style: none;
  display: inline-block;
  padding: 1em;
  font-size: larger;
  color: white;

  a:hover {
    color: #2a76dd;
  }
  a {
    color: white;
    text-decoration: none;
  }`
const NavigationContainer = styled.ul`
  list-style: none;
  background-color: #1d2025;
  margin: 0;
  display: flex;
`
const Navigation = () => {
    
    return (
        <div>
            <NavigationContainer>
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/deliveries">Deliveries</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/expenses">Expenses</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/login">Log in</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/settings">Settings</NavLink>
                </NavItem>
            </NavigationContainer>
        </div>
    )
}

export default Navigation;
