import React from "react"
import { NavbarContainer } from "../styles/Navbar.style"
import { NavbarLink } from "../styles/Navbar.style"

const Navbar = () => {
    return (<NavbarContainer>
         <NavbarLink to="/">Home</NavbarLink>
         <NavbarLink to="/list">Lists</NavbarLink>
         <NavbarLink to="/addlist">Create List</NavbarLink>
    </NavbarContainer>)
}


export default Navbar;