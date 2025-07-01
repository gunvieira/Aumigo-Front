import { FiltroBotao } from "@/components/myui/BotaoPadrao/Botao.tsx";

// Os tipos que o componente espera receber
type Filtros = {
    sexo: "Todos" | "Macho" | "Fêmea";
    especie: "Todos" | "Cachorro" | "Gato";
};

interface FiltroPetsProps {
    filtrosAtuais: Filtros; // 👈 Prop que vem do pai com o estado atual
    onChange: (novosFiltros: Filtros) => void;
}

// 1. Remova o estado interno (useState) e use a prop 'filtrosAtuais'
export function FiltroPets({ filtrosAtuais, onChange }: FiltroPetsProps) {

    // A função 'atualizarFiltros' foi removida para simplificar.
    // A lógica agora está diretamente no 'onClick' de cada botão.

    return (
        <div className="mb-6">
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Sexo</h4>
                <div className="flex flex-wrap gap-2">
                    {/* O casting 'as const' é uma boa prática com arrays de literais */}
                    {(["Todos", "Fêmea", "Macho"] as const).map((s) => (
                        <FiltroBotao
                            key={s}
                            // 2. O botão ativo é decidido comparando com a prop 'filtrosAtuais'
                            isActive={filtrosAtuais.sexo === s}
                            // 3. O onClick agora chama 'onChange' diretamente,
                            //    preservando o outro filtro que veio na prop.
                            onClick={() => onChange({ ...filtrosAtuais, sexo: s })}
                        >
                            {s}
                        </FiltroBotao>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-2">Espécie</h4>
                <div className="flex flex-wrap gap-2">
                    {(["Todos", "Cachorro", "Gato"] as const).map((e) => (
                        <FiltroBotao
                            key={e}
                            // A mesma lógica para o botão de espécie
                            isActive={filtrosAtuais.especie === e}
                            onClick={() => onChange({ ...filtrosAtuais, especie: e })}
                        >
                            {e}
                        </FiltroBotao>
                    ))}
                </div>
            </div>
        </div>
    );
}