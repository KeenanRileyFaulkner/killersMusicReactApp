import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const BaseComponent = ({ authed, login, logout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/about', {replace: true});
    }, []);

    return (
        <Outlet context={{authed, login, logout}} />
    )
}

export default BaseComponent;