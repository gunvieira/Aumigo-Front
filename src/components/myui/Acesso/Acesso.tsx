import {Botao, BotaoSegundario} from "@/components/myui/BotaoPadrao/Botao.tsx";


export default function Acesso() {
    return (
        <div className="flex flex-row items-center gap-5 ">
            <BotaoSegundario> Entrar </BotaoSegundario>
            <Botao>Cadastre-se</Botao>
        </div>
    )
}