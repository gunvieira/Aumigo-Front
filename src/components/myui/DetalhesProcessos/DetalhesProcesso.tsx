import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogDescription,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

import axios from 'axios';
import BotaoEntrar from "../BotaoPadrao/Botao";

// Interface do Processo
interface IProcesso {
    id_adocao: number;
    data_solicitacao: string;
    status: 'PENDENTE' | 'APROVADO' | 'RECUSADO'; // Status mais específico
    animal: {
        nome: string;
        imagem: string;
    };
    usuario: {
        nome: string;
        email: string;
        telefone: string;
    };
}

interface DetalhesProcessoProps {
    children: ReactNode;
    processo: IProcesso;
    onUpdate: () => void;
}

export default function DetalhesProcesso({ children, processo, onUpdate }: DetalhesProcessoProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateStatus = async (novoStatus: 'APROVADO' | 'RECUSADO') => {
        setIsSubmitting(true);
        setError(null);
        try {/*
            await axios.post(`/api/processos/${processo.id_adocao}/status`, {
                status: novoStatus
            });*/
            console.log('Status que seria enviado para a API:', novoStatus);
            onUpdate();
        } catch (err) {
            console.error(`Erro ao atualizar o status para ${novoStatus}:`, err);
            setError('Falha ao atualizar o status. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Função para renderizar os botões de ação ou a mensagem de status finalizado
    const renderActionFooter = () => {
        // 2. Verificamos se o status é 'PENDENTE' para exibir os botões
        if (processo.status === 'PENDENTE') {
            return (
                <div className="flex flex-row justify-center gap-5 mt-6">
                    <DialogClose asChild>
                        {/* 3. Usando o novo BotaoEntrar e passando o estado de loading */}
                        <BotaoEntrar
                            onClick={() => handleUpdateStatus('APROVADO')}
                            isLoading={isSubmitting}
                            variant="primary"
                        >
                            Aceitar
                        </BotaoEntrar>
                    </DialogClose>
                    <DialogClose asChild>
                        <BotaoEntrar
                            onClick={() => handleUpdateStatus('RECUSADO')}
                            isLoading={isSubmitting}
                            // Usamos a prop 'className' para customizar a cor do botão de recusar
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Recusar
                        </BotaoEntrar>
                    </DialogClose>
                </div>
            );
        }

        // Caso o status não seja 'PENDENTE', exibimos uma mensagem
        return (
            <div className="mt-6 text-center">
                <p className="text-gray-600 font-medium bg-gray-100 p-3 rounded-md">
                    Este processo foi finalizado com o status: <strong>{processo.status}</strong>
                </p>
            </div>
        );
    };

    return (
        <Dialog onOpenChange={(open) => !open && setError(null)}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Detalhes do processo de adoção</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    <div className="bg-white rounded-lg p-2 w-full">
                        {/* Detalhes do animal e usuário (código inalterado) */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <img src={processo.animal.imagem} alt={processo.animal.nome}
                                     className="w-20 h-20 rounded-lg object-cover"/>
                                <h2 className="text-xl font-bold">{processo.animal.nome}</h2>
                            </div>
                            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                                 {processo.status}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                            <div><strong>Nome do animal:</strong> {processo.animal.nome}</div>
                            <div><strong>Data do pedido:</strong> {new Date(processo.data_solicitacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</div>
                            <div><strong>Número do pedido:</strong> #{processo.id_adocao}</div>
                            <div><strong>Nome do Solicitante:</strong> {processo.usuario.nome}</div>
                            <div><strong>Email:</strong> {processo.usuario.email}</div>
                            <div><strong>Telefone:</strong> {processo.usuario.telefone}</div>
                        </div>
                    </div>
                    <DialogDescription className="sr-only">
                        Revise as informações do solicitante e do animal. Você pode aprovar ou recusar o pedido de adoção.
                    </DialogDescription>

                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

                    {/* Renderiza o rodapé com os botões ou a mensagem */}
                    {renderActionFooter()}
                </div>
            </DialogContent>
        </Dialog>
    );
}