import {BotaoGhost} from "@/components/myui/BotaoPadrao/Botao.tsx";

export default function NavBar() {
    return (
        <div className="flex flex-row gap-0.5">
            <BotaoGhost to="/">Home</BotaoGhost>
            <BotaoGhost to="/quem-somos">Quem Somos</BotaoGhost>
            <BotaoGhost to="/adotar">Adote</BotaoGhost>
            <BotaoGhost to="/ajudar">Colabore</BotaoGhost>
        </div>
    );
}
