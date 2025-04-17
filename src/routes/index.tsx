import {Routes, Route} from "react-router-dom";
import Home from "@/pages/home.tsx";
import {Botao} from "@/components/myui/BotaoPadrao/Botao.tsx";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Botao> Cadastro </Botao>} />
        </Routes>

    )
}