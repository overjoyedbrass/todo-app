import styled from "styled-components"
import { NavLink } from "react-router-dom"

export const NavbarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    color: #888;
    list-style: none;    
    border-right: 1px solid rgba(84, 78, 114, 1);
    letter-spacing: 1px;
    a+a {
        margin-top: 0.25em;
    }
`

export const NavbarLink = styled(NavLink)`
    padding: 0.5em 1em 0.5em;
    font-size: 1.5em;
    text-decoration: none;
    color: #888;

    &:hover,
    &.active {
        background-color: rgba(84, 78, 114, 1);
        border-radius: 10px 0px 0px 10px;
        color: white;
    }

    &.active {
        color: yellow;
        background-color: rgba(84, 78, 114, 1);
        border-radius: 10px 0px 0px 10px;
    }
`