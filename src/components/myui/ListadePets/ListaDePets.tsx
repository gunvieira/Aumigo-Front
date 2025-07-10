import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FiltroPets } from "@/components/myui/FiltroPets/FiltroPets";
import { PetCard } from "@/components/myui/Cardpets/Cardpets";
import { LoaderCircle } from "lucide-react";

interface Pet {
    id: number;
    nome: string;
    sexo: "Macho" | "Fêmea";
    especie: "Cachorro" | "Gato";
    tidade: string;
    porte: string;
    midiaImagem: string;
}

type Filtros = {
    sexo: "Todos" | "Macho" | "Fêmea";
    especie: "Todos" | "Cachorro" | "Gato";
};

export function ListaDePets() {
    // O hook já estava aqui, agora vamos usá-lo completamente.
    const [searchParams, setSearchParams] = useSearchParams();

    // --- MODIFICAÇÃO 1: Definir o estado inicial a partir da URL ---
    // Lemos os parâmetros 'especie' e 'sexo' da URL.
    // Se não existirem, usamos 'Todos' como valor padrão.
    const especieInicial = (searchParams.get("especie") || "Todos") as Filtros['especie'];
    const sexoInicial = (searchParams.get("sexo") || "Todos") as Filtros['sexo'];

    // O estado agora começa com os valores da URL.
    const [filtros, setFiltros] = useState<Filtros>({
        sexo: sexoInicial,
        especie: especieInicial
    });

    const [pets, setPets] = useState<Pet[]>([]);
    const [petsFiltrados, setPetsFiltrados] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    // Este useEffect para buscar os dados iniciais continua o mesmo.
    useEffect(() => {
        axios.get<Pet[]>("http://localhost:8080/animais")
            .then((response) => {
                setPets(response.data);
            })
            .catch(error => console.error("Erro ao buscar a lista de pets:", error))
            .finally(() => setLoading(false));
    }, []);

    // --- MODIFICAÇÃO 2: Sincronizar o estado do filtro COM a URL ---
    useEffect(() => {
        const resultado = pets.filter((pet) => {
            const sexoOk = filtros.sexo === "Todos" || pet.sexo === filtros.sexo;
            const especieOk = filtros.especie === "Todos" || pet.especie === filtros.especie;
            return sexoOk && especieOk;
        });
        setPetsFiltrados(resultado);

        //  Lógica para atualizar a URL sempre que os filtros mudarem
        const params = new URLSearchParams();
        // Só adiciona o parâmetro na URL se ele for diferente de "Todos"
        if (filtros.especie !== "Todos") {
            params.set("especie", filtros.especie);
        }
        if (filtros.sexo !== "Todos") {
            params.set("sexo", filtros.sexo);
        }
        // Atualiza a URL sem recarregar a página e sem poluir o histórico
        setSearchParams(params, { replace: true });

    }, [filtros, pets, setSearchParams]); // Adiciona setSearchParams à lista de dependências

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><LoaderCircle className="h-12 w-12 animate-spin text-primary" /></div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-center">Encontre seu novo amigo</h1>
                <p className="text-center text-muted-foreground mt-2">Filtre para encontrar o pet ideal para você</p>
            </div>

            <FiltroPets filtrosAtuais={filtros} onChange={setFiltros} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {petsFiltrados.map((pet) => (
                    <Link to={`/pet/${pet.id}`} key={pet.id} className="no-underline">
                        <PetCard
                            nome={pet.nome}
                            imagem={pet.midiaImagem}
                            tidade={pet.tidade}
                            porte={pet.porte}
                            sexo={pet.sexo}
                        />
                    </Link>
                ))}
            </div>
            {petsFiltrados.length === 0 && !loading && (
                <p className="text-center text-lg text-muted-foreground py-10">Nenhum pet encontrado com esses filtros.</p>
            )}
        </div>
    );
}