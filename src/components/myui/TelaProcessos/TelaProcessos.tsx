import { Botao } from "@/components/myui/BotaoPadrao/Botao.tsx";
import DetalhesProcesso from "@/components/myui/DetalhesProcessos/DetalhesProcesso.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.tsx";
import axios from 'axios'; // Importa o Axios
import { LoaderCircle, FileX2 } from "lucide-react";

// A interface para o processo de adoção permanece a mesma
interface IProcesso {
    id_adocao: number;
    data_solicitacao: string;
    status: string;
    animal: {
        id_animal: number;
        nome: string;
        imagem: string;
        porte: string;
        sexo: string;
        raca: {
            nome_raca: string;
            especie: {
                nome_especie: string;
            }
        }
    };
    usuario: {
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        // Adicione o campo cidade se ele vier da API
        // cidade: string;
    };
}

const statusColors: { [key: string]: string } = {
    PENDENTE: 'bg-yellow-400',
    APROVADO: 'bg-green-500',
    RECUSADO: 'bg-red-500',
};


const ConteudoProcessos: React.FC = () => {
    const { logout } = useAuth();
    const [podeCadastrar, setPodeCadastrar] = useState<boolean>(false);
    const [processos, setProcessos] = useState<IProcesso[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Função para buscar os processos da API usando Axios
    const fetchProcessos = async () => {
        setLoading(true);
        try {

            // Substitua '/api/processos' pelo endpoint real da sua API.
            // O Axios já converte a resposta JSON automaticamente.
            const response = await axios.get<IProcesso[]>('/processos.json');
            setProcessos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Erro ao buscar os processos com Axios:", error);
            setProcessos([]); // Garante que o estado seja um array vazio em caso de erro
        } finally {
            setLoading(false);
        }
    };

    // O useEffect agora chama a nova função fetchProcessos
    useEffect(() => {
        const tipoUsuario: string | null = sessionStorage.getItem('tipoUsuario');
        if (tipoUsuario !== '1') {
            setPodeCadastrar(true);
        }
        fetchProcessos();
    }, []);

    const renderMainContent = () => {
        if (loading) {
            return (
                <div className="flex flex-1 items-center justify-center h-full">
                    <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                </div>
            );
        }

        if (processos.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
                    <FileX2 className="h-16 w-16 mb-4" />
                    <h3 className="text-lg font-semibold">Nenhum processo de adoção encontrado.</h3>
                    <p>Você ainda não iniciou nenhum processo.</p>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-md">
                    <thead>
                    <tr className="text-left border-b border-gray-200">
                        <th className="p-4">Animal</th>
                        <th className="p-4">Data do Pedido</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {processos.map((processo) => (
                        <tr key={processo.id_adocao} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-2">
                                <img
                                    src={processo.animal?.imagem || '/caminho/para/imagem/padrao.png'}
                                    alt={processo.animal?.nome || 'Animal'}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                {processo.animal?.nome}
                            </td>
                            <td className="p-4">
                                {new Date(processo.data_solicitacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                            </td>
                            <td className="p-4">
                                    <span className="flex items-center gap-2">
                                        <span className={`w-2 h-2 ${statusColors[processo.status]} rounded-full`}></span>
                                        {processo.status}
                                    </span>
                            </td>
                            <td className="p-4">
                                {/*
                                  - Passamos o objeto 'processo' inteiro para o modal.
                                  - Passamos a função 'fetchProcessos' como callback 'onUpdate'
                                    para que o modal possa recarregar a lista após uma ação.
                                */}
                                <DetalhesProcesso processo={processo} onUpdate={fetchProcessos}>
                                    <button
                                        className="border border-emerald-400 text-emerald-400 rounded px-3 py-1 hover:bg-[#E6F6F3] transition">
                                        Ver detalhes
                                    </button>
                                </DetalhesProcesso>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full max-w-screen-xl mx-auto gap-6">
            <div className="min-h-screen bg-white flex">
                <aside className="w-48 bg-white p-6 px-5 border-r border-gray-200">
                    <h2 className="text-lg font-semibold mb-10">Minha conta</h2>
                    <nav className="flex flex-col gap-4">
                        <Botao to="/dadospessoais" tsize="text-[18px]" customClasses="w-40">
                            Dados Pessoais
                        </Botao>
                        <Botao to="/processos" tsize="text-[18px]" customClasses="w-40">
                            Processos
                        </Botao>
                        {podeCadastrar && (
                            <Botao to="/cadastraranimal" tsize="text-[18px]" customClasses="w-40">
                                Cadastrar animal
                            </Botao>
                        )}
                        <Botao onClick={handleLogout} tsize="text-[18px]" customClasses="w-40">Sair</Botao>
                    </nav>
                </aside>

                <main className="flex-1 p-10">
                    <h1 className="text-xl font-semibold mb-6">Meus processos de adoção</h1>
                    {renderMainContent()}
                </main>
            </div>
        </div>
    );
}

export default ConteudoProcessos;