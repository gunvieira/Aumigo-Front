import {Routes, Route} from "react-router-dom";
import Home from "@/pages/home.tsx";
import {Botao} from "@/components/myui/BotaoPadrao/Botao.tsx";
import Adotar from "@/pages/adotar.tsx";
import Colabore from "@/pages/colabore.tsx";
import TelaProcessos from "@/pages/processosusuario.tsx";
import TelaLogin from "@/pages/entrar.tsx";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adote" element={<Adotar/>} />
            <Route path="/cadastro" element={<Botao to="/"> Cadastro </Botao>} />
            <Route path="/sobre" />
            <Route path="/colabore" element={<Colabore/>} />
            <Route path="/processos" element={<TelaProcessos/>} />
            <Route path="/entrar" element={<TelaLogin/>} />
        </Routes>

    )
}