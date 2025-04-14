import { Button } from "@/components/ui/button";

export function Botao(props: { children: string; }) {
    const textoinserido = props.children ? props.children : "Botao";

    return (
        <Button className="bg-emerald-400 hover:bg-emerald-500 font-dosis cursor-pointer text-white font-medium " >
            {textoinserido}
        </Button>
    );
}

export function BotaoSegundario(props: { children: string; }) {
    const textoinseridosec = props.children ? props.children : "Botao";

    return (
        <Button variant="secondary" size="sm" className="bg-gray-200 hover:bg-gray-300 font-dosis cursor-pointer font-medium rounded ">
            {textoinseridosec}
        </Button>
    );
}
