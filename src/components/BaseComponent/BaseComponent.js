import { Outlet } from "react-router-dom"

const BaseComponent = ({ authed, login, logout }) => {

    return (
        <Outlet context={{authed, login, logout}} />
    )
}

export default BaseComponent;