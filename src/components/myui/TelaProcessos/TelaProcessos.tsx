import {Botao, BotaoGhost, BotaoSegundario} from "@/components/myui/BotaoPadrao/Botao.tsx";
import DetalhesProcesso from "@/components/myui/DetalhesProcessos/DetalhesProcesso.tsx";
import {Button} from "@/components/ui/button.tsx";


export default function ConteudoProcessos() {
    return (
        <div className="min-h-screen bg-white flex">
            {/* Arrumar Botoes */}
            <aside className="w-48 bg-white p-6 border-r border-gray-200">
                <h2 className="text-lg font-semibold mb-10">Minha conta</h2>
                <nav className="flex flex-col gap-4">
                    <Botao to="/dadospessoais" tsize="text-[18px]">Dados Pessoais</Botao>
                    <Button size="lg" className="bg-emerald-400 hover:bg-emerald-500 font-dosis cursor-pointer text-white text-[18px]">Dados Pessoais</Button>
                    <button className="bg-[#4EC9B0] text-white py-2 px-4 rounded">Processos</button>
                    <Botao to="/" tsize="text-[18px]">Sair</Botao>
                </nav>
            </aside>

            {/* Conteúdo principal */}
            <main className="flex-1 p-10">
                <h1 className="text-xl font-semibold mb-6">Meus processos de adoção</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md">
                        <thead>
                        <tr className="text-left border-b border-gray-200">
                            <th className="p-4">Nome</th>
                            <th className="p-4">Data do Pedido</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-2">
                                <img src="/Imagens/TelaInicial/neguinha.png" alt="Rex" className="w-8 h-8 rounded-full" />
                                Rex
                            </td>
                            <td className="p-4">05/05/2025</td>
                            <td className="p-4">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Em análise
                  </span>
                            </td>
                            <td className="p-4">
                                <DetalhesProcesso>
                                    <button className="border border-[#4EC9B0] text-[#4EC9B0] rounded px-3 py-1 hover:bg-[#E6F6F3] transition">
                                        Ver detalhes
                                    </button>
                                </DetalhesProcesso>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
