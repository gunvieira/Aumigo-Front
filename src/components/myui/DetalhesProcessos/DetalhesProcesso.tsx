import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog";

import { ReactNode } from "react";

interface DetalhesProcessoProps {
    children: ReactNode;
}

export default function DetalhesProcesso({ children }: DetalhesProcessoProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Meu processo de adoção</DialogTitle>
                </DialogHeader>

                <div className="bg-white rounded-lg p-2">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <img src="/Imagens/TelaInicial/neguinha.png" alt="Rex" className="w-20 h-20 rounded-lg object-cover" />
                            <h2 className="text-xl font-bold">Rex</h2>
                        </div>
                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
              Em análise
            </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                        <div><strong>Nome do animal:</strong> Rex</div>
                        <div><strong>Data do pedido:</strong> 05/05/2025</div>
                        <div><strong>Número do pedido:</strong> #1234</div>
                        <div><strong>Nome:</strong> João</div>
                        <div><strong>Sobrenome:</strong> Silva</div>
                        <div><strong>Email:</strong> joao@email.com</div>
                        <div><strong>Telefone:</strong> (43) 99999-1234</div>
                        <div><strong>Endereço:</strong> Rua A, 123, Curitiba – PR</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
