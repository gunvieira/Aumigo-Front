import {BotaoGhost} from "@/components/myui/BotaoPadrao/Botao.tsx";

export default function NavBar() {
    return (
        <div className="flex flex-row">
            <BotaoGhost to="/">Home</BotaoGhost>
            <BotaoGhost to="/adotar">Adotar</BotaoGhost>
            <BotaoGhost to="/quem-somos">Quem Somos</BotaoGhost>
            <BotaoGhost to="/ajudar">Ajudar</BotaoGhost>
        </div>
    );
}
