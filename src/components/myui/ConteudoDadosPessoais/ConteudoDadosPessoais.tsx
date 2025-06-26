import { Botao } from "@/components/myui/BotaoPadrao/Botao.tsx";
import CampoDeDados from "../CampoDeDados/CampoDeDados";

// Componente para renderizar um campo de dados pessoais.
// Isso ajuda a evitar repetição de código e mantém o estilo consistente.


export default function ConteudoDadosPessoais() {
    // Objeto com os dados do usuário para facilitar a manutenção.
    const dadosUsuario = {
        nome: "João",
        sobrenome: "Silva",
        email: "joao@email.com",
        cpf: "000.000.000-00",
        cidade: "Londrina", // Corrigido o dado que estava como email na imagem
        celular: "(43) 99999-1234",
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Menu Lateral:
              - A estrutura é a mesma do componente anterior.
              - O botão "Dados pessoais" agora tem o estilo de ativo (fundo sólido).
              - O botão "Processos" tem um estilo de inativo (fundo transparente com borda),
                para mostrar qual página não está selecionada.
            */}
            <aside className="w-48 bg-white p-6 border-r border-gray-200 flex flex-col">
                <h2 className="text-lg font-semibold mb-10">Minha conta</h2>
                <nav className="flex flex-col gap-4">
                    {/* Botão ativo */}
                    <button className="bg-[#4EC9B0] text-white py-2 px-4 rounded-md">
                        Dados pessoais
                    </button>
                    {/* Botão inativo */}
                    <button className="bg-white border border-[#4EC9B0] text-[#4EC9B0] py-2 px-4 rounded-md hover:bg-[#E6F6F3] transition">
                        Processos
                    </button>
                    <Botao to="/processos" tsize="text-[18px]">Processos</Botao>
                    {/* O componente de botão "Sair" é reutilizado */}
                    <Botao to="/" tsize="text-[18px]">Sair</Botao>
                </nav>
            </aside>

            {/* Conteúdo Principal:
              - O título foi alterado para "Dados pessoais".
              - A tabela foi removida e substituída por uma div que organiza os campos.
              - Usamos `flex flex-col` e `gap-4` para empilhar os campos verticalmente com espaçamento.
            */}
            <main className="flex-1 p-10">
                <h1 className="text-2xl font-semibold mb-8">Dados pessoais</h1>

                <div className="max-w-2xl flex flex-col gap-4">
                    {/* Componente CampoDeDados:
                      - Cada campo de informação é renderizado pelo componente `CampoDeDados`.
                      - Isso torna o código mais limpo e fácil de ler.
                      - Passamos `label` (o nome do campo) e `value` (o dado do usuário) como propriedades.
                    */}
                    <CampoDeDados label="Nome" value={dadosUsuario.nome} />
                    <CampoDeDados label="Sobrenome" value={dadosUsuario.sobrenome} />
                    <CampoDeDados label="Email" value={dadosUsuario.email} />
                    <CampoDeDados label="CPF" value={dadosUsuario.cpf} />
                    <CampoDeDados label="Celular" value={dadosUsuario.celular} />
                    <CampoDeDados label="Cidade" value={dadosUsuario.cidade} />
                </div>
            </main>
        </div>
    );
}