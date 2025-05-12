import { useEffect, useState } from "react";
import {FiltroPets} from "@/components/myui/FiltroPets/FiltroPets.tsx";
import {PetCard} from "@/components/myui/Cardpets/Cardpets.tsx";


interface Pet {
    id: number;
    nome: string;
    sexo: "Macho" | "Fêmea";
    especie: "Cachorro" | "Gato";
    idade: string;
    porte: string;
    imagem: string;
}

export function ListaDePets() {
    const [filtros, setFiltros] = useState({
        sexo: "Todos" as "Todos" | "Macho" | "Fêmea",
        especie: "Todos" as "Todos" | "Cachorro" | "Gato",
    });

    const [pets, setPets] = useState<Pet[]>([]);
    const [petsFiltrados, setPetsFiltrados] = useState<Pet[]>([]);

    useEffect(() => {
        fetch("/pets.json")
            .then((res) => res.json())
            .then((data: Pet[]) => {
                setPets(data);
                setPetsFiltrados(data);
            });
    }, []);

    useEffect(() => {
        const resultado = pets.filter((pet) => {
            const sexoOk = filtros.sexo === "Todos" || pet.sexo === filtros.sexo;
            const especieOk = filtros.especie === "Todos" || pet.especie === filtros.especie;
            return sexoOk && especieOk;
        });
        setPetsFiltrados(resultado);
    }, [filtros, pets]);

    return (
        <div className="space-y-6">
            <FiltroPets onChange={setFiltros} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {petsFiltrados.map((pet) => (
                    <PetCard
                        key={pet.id}
                        nome={pet.nome}
                        imagem={pet.imagem}
                        sexo={pet.sexo}
                        idade={pet.idade}
                        porte={pet.porte}
                    />
                ))}
            </div>
        </div>
    );
}
