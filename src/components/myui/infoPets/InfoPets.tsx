import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, LoaderCircle, AlertTriangle } from "lucide-react";
import Header from "@/components/myui/Header/Header.tsx";

import Footer from "@/components/myui/Footer/Footer.tsx";
import {Botao} from "@/components/myui/BotaoPadrao/Botao.tsx";

interface Pet {
    id: number;
    nome: string;
    sexo: "Macho" | "Fêmea";
    especie: "Cachorro" | "Gato";
    tidade: string;
    porte: string;
    imagem: string;
}

export function PaginaDetalhesPet() {
    const { petId } = useParams<{ petId: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const buscarPet = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Pet[]>('/pets.json');
                const petEncontrado = response.data.find(p => p.id === Number(petId));
                if (petEncontrado) {
                    setPet(petEncontrado);
                } else {
                    setError("Pet não encontrado.");
                }
            } catch {
                setError("Não foi possível carregar as informações.");
            } finally {
                setLoading(false);
            }
        };

        if (petId) {
            buscarPet();
        }
    }, [petId]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><LoaderCircle className="h-10 w-10 animate-spin text-primary" /></div>;
    }

    if (error || !pet) {
        return <div className="flex h-screen items-center justify-center text-red-600"><AlertTriangle className="mr-2"/>{error}</div>;
    }

    return (
        <>
            <Header />
            <div className="flex flex-col w-full max-w-screen-xl mx-auto gap-6">
                <div className="container mx-auto p-4 md:p-8">
                    <Link to="/adote" className="inline-flex items-center text-primary mb-6 hover:underline font-semibold">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para a lista
                    </Link>
                    <Card className="w-full max-w-5xl mx-auto overflow-hidden shadow-lg">
                        <div className="grid md:grid-cols-2">
                            <div className="h-[400px] md:h-[600px]">
                                <img
                                    src={pet.imagem}
                                    alt={`Foto de ${pet.nome}`}

                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col p-6 sm:p-8">
                                <CardHeader>
                                    <CardTitle className="text-4xl lg:text-5xl font-extrabold">{pet.nome}</CardTitle>
                                    <CardDescription className="text-lg">{pet.especie}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4 text-base">
                                    <p><strong>Sexo:</strong> {pet.sexo}</p>
                                    <p><strong>Idade:</strong> {pet.tidade}</p>
                                    <p><strong>Porte:</strong> {pet.porte}</p>
                                </CardContent>
                                <CardFooter>
                                    <Botao to="#" tsize="text-[24px]" customClasses="w-80 h-12">Quero Adotar!</Botao>
                                </CardFooter>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );


}