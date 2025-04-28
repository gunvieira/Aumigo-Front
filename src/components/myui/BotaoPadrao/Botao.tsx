import {Button} from "@/components/ui/button";
import {Link, useLocation} from "react-router";

interface BotaoGhostProps {
    children: string;
    to: string;
}

export function Botao(props: { children: string; to: string; tsize: string }) {
    const textoinserido = props.children || "Botao";
    const { to, tsize } = props;

    return (
        <Link to={to}>
            <Button
                size="lg"
                className={`bg-emerald-400 hover:bg-emerald-500 font-dosis cursor-pointer text-white ${tsize}`}
            >
                {textoinserido}
            </Button>
        </Link>
    );
}

export function BotaoSegundario(props: { children: string; to: string }) {
    const textoinseridosec = props.children ? props.children : "Botao";
    const {to} = props ? props : " ";
/* como faço para deixar opciona*/
    return (
        <Link to={to}>
            <Button
                variant="secondary"
                size="lg"
                className="bg-gray-200 hover:bg-gray-300 font-dosis cursor-pointer "
            >
                {textoinseridosec}
            </Button>
        </Link>
    );
}


export function BotaoGhost({children, to}: BotaoGhostProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to}>
            <Button
                variant="ghost"
                size="lg"
                className={`font-dosis cursor-pointer font-medium px-3 text-[16px] ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
            >
                {children}
            </Button>
        </Link>
    );
}
