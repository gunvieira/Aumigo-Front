import {Botao, BotaoSegundario} from "@/components/myui/BotaoPadrao/Botao.tsx";


export default function Acesso() {
    return (
        <div className="flex flex-row items-center justify-center h-screen gap-5 bg-gray-100 ">
            <BotaoSegundario> Entrar </BotaoSegundario>
            <Botao>Cadastre-se</Botao>
        </div>
    )
}