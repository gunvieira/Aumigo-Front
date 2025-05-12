import {Button} from "@/components/ui/button";
import {Link, useLocation} from "react-router";

interface BotaoGhostProps {
    children: string;
    to: string;
}

export function Botao(props: {
    children?: string;
    to: string;
    tsize?: string;
    growOnHover?: boolean;
}) {
    const textoinserido = props.children ?? "Botão";
    const { to, tsize, growOnHover } = props;

    return (
        <Link to={to}>
            <Button
                size="lg"
                className={`bg-emerald-400 hover:bg-emerald-500 font-dosis cursor-pointer text-white ${tsize ?? ""} 
                    ${growOnHover ? "transition-transform duration-500 hover:scale-110 ease-in-out" : ""}`}
            >
                {textoinserido}
            </Button>
        </Link>
    );
}

export function BotaoSegundario(props: { children: string; to: string }) {
    const textoinseridosec = props.children ? props.children : "Botao";
    const to = props.to ?? "#";

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

export function BotaoAdote(props: {
    children?: string;
    to: string;
    tsize?: string;
    growOnHover?: boolean;
}) {
    const textoinserido = props.children ?? "Botão";
    const { to, tsize, growOnHover } = props;

    return (
        <Link to={to}>
            <Button
                size="lg"
                className={`scale-150 bg-emerald-600 hover:bg-emerald-700 font-dosis cursor-pointer px-10 py-5 font-bold text-white ${tsize ?? ""} 
                    ${growOnHover ? "transition-transform duration-500 hover:scale-200 ease-in-out" : ""}`}
            >
                {textoinserido}
            </Button>
        </Link>
    );
}

interface FiltroBotaoProps {
    isActive: boolean;
    onClick: () => void;
    children: string;
}

export function FiltroBotao({ isActive, onClick, children }: FiltroBotaoProps) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md font-dosis font-medium text-sm transition-colors
        ${isActive ? "bg-emerald-400 text-white" : "bg-white text-black hover:bg-gray-100"}`}
        >
            {children}
        </button>
    );
}

