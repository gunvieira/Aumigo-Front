import { Card, CardContent } from "@/components/ui/card";

interface PetCardProps {
    nome: string;
    imagem: string;
    sexo: string;
    idade: string;
    porte: string;
}

export function PetCard({ nome, imagem, sexo, idade, porte }: PetCardProps) {
    return (
        <Card className="w-64 border rounded-xl overflow-hidden shadow-sm">
            <img
                src={imagem}
                alt={`Foto de ${nome}`}
                className="w-full h-48 object-cover p-5 pr-15"
            />
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-black">{nome}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    {`${sexo} | ${idade} | ${porte}`}
                </p>
            </CardContent>
        </Card>
    );
}
