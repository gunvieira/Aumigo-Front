

import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "@/context/AuthContext.tsx";


// ...

const RotaProtegida = () => {
    const {isLoggedIn} = useAuth(); // Simples e seguro

    if (!isLoggedIn) {
        return <Navigate to="/entrar" replace/>;
    }

    return <Outlet/>;
}

export default RotaProtegida;


