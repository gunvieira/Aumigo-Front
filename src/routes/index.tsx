import {Routes, Route} from "react-router-dom";
import Home from "@/pages/home.tsx";
import {Botao} from "@/components/myui/BotaoPadrao/Botao.tsx";
import Adotar from "@/pages/adotar.tsx";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adotar" element={<Adotar/>} />
            <Route path="/cadastro" element={<Botao to="/"> Cadastro </Botao>} />
            <Route path="/sobre" />
        </Routes>

    )
}