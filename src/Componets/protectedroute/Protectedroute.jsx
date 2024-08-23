import { Navigate } from "react-router-dom";

function Protectedroute(props) {
    if (localStorage.getItem('usertoken')) {
        return props.children
    }
    else return <Navigate to={'/login'}></Navigate>
}

export default Protectedroute;