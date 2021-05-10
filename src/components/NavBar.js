import React,{useContext} from 'react'
import {Navbar} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import '../styles/NavBar.css'
import { UserContext } from '../contexts/UserContext';

export const NavBar = () => {
    const authUser = window.localStorage.getItem('token')===null
    const {setAuthUser} = useContext(UserContext)

    const logout= ()=>{
        window.localStorage.removeItem('token')
        setAuthUser()
    }

    return (
        <>
            <Navbar bg="dark" className="navbar">
                <Navbar.Brand>
                <h2>Github & Calendar App</h2>
                </Navbar.Brand>
                <div className="nav-links">
                {authUser && <NavLink exact activeClassName="active" to="/signup">Sign Up</NavLink>}
                {authUser && <NavLink exact activeClassName="active" to="/login">Sign In</NavLink>}
                {!authUser && <NavLink exact activeClassName="active" to="/login" onClick={logout}>Logout</NavLink>}
                </div>
                
            </Navbar>
        </>
    )
}
