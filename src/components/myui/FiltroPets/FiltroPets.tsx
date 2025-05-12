import { useState } from "react";
import {FiltroBotao} from "@/components/myui/BotaoPadrao/Botao.tsx";



interface FiltroPetsProps {
    onChange: (filtros: {
        sexo: "Todos" | "Macho" | "Fêmea";
        especie: "Todos" | "Cachorro" | "Gato";
    }) => void;
}

export function FiltroPets({ onChange }: FiltroPetsProps) {
    const [sexo, setSexo] = useState<"Todos" | "Macho" | "Fêmea">("Todos");
    const [especie, setEspecie] = useState<"Todos" | "Cachorro" | "Gato">("Todos");

    const atualizarFiltros = (novoSexo: typeof sexo, novaEspecie: typeof especie) => {
        setSexo(novoSexo);
        setEspecie(novaEspecie);
        onChange({ sexo: novoSexo, especie: novaEspecie });
    };

    return (
        <div className="mb-6">
            <div className="mb-4">
                <h4 className="font-semibold mb-1">Sexo</h4>
                <div className="flex gap-2">
                    {["Fêmea", "Macho", "Todos"].map((s) => (
                        <FiltroBotao
                            key={s}
                            isActive={sexo === s}
                            onClick={() => atualizarFiltros(s as any, especie)}
                        >
                            {s}
                        </FiltroBotao>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-1">Espécie</h4>
                <div className="flex gap-2">
                    {["Todos", "Cachorro", "Gato"].map((e) => (
                        <FiltroBotao
                            key={e}
                            isActive={especie === e}
                            onClick={() => atualizarFiltros(sexo, e as any)}
                        >
                            {e}
                        </FiltroBotao>
                    ))}
                </div>
            </div>
        </div>
    );
}
