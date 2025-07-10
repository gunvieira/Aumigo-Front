import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Certifique-se de que tem o react-router-dom instalado
import { FaUserPlus } from "react-icons/fa";

// A assumir que estes são os seus componentes personalizados dos caminhos especificados
import MyInput from "@/components/myui/Input/Input.tsx";
import Checkbox from "@/components/myui/CheckBox/CheckBox.tsx";
import BotaoEntrar from "@/components/myui/BotaoPadrao/Botao.tsx";
import {useAuth} from "@/context/AuthContext.tsx";

const TelaLogin: React.FC = () => {
    // Estado para armazenar os valores dos campos de entrada
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    // Estado para armazenar quaisquer mensagens de erro do servidor
    const [error, setError] = useState<string | null>(null);
    // Novo estado para controlar o estado de carregamento do formulário
    const [isLoading, setIsLoading] = useState(false);

    // Hook do react-router-dom para navegar o utilizador programaticamente
    const navigate = useNavigate();
    const { login } = useAuth();

    /**
     * Lida com a submissão do formulário.
     * Previne o recarregamento padrão da página, envia um pedido POST para o backend,
     * e trata do sucesso ou da falha.
     * @param e - O evento do formulário.
     */
    const handleLoginSubmit = async (e: React.FormEvent) => {
        // Previne o comportamento padrão de submissão do formulário (recarregar a página)
        e.preventDefault();
        setError(null); // Limpa a mensagem de erro a cada nova submissão
        setIsLoading(true); // Ativa o estado de carregamento

        try {
            // Envia um pedido POST para o seu endpoint /login
            // O corpo do pedido corresponde ao `LoginUserDTO` esperado pelo seu controlador Spring
            const response = await axios.post('http://localhost:8080/users/login', {
                email: email,
                senha: senha,
            });

            // Se o pedido for bem-sucedido (status 200 OK), o backend retorna os dados do utilizador.
            // Pode armazenar os dados do utilizador no contexto ou no armazenamento local aqui, se necessário.
            console.log('Login bem-sucedido:', response.data);
            login(response.data.idUsuario);
            sessionStorage.setItem('tipoUsuario', String(response.data.tipoUsuario));

            // Navega para a página principal da aplicação após um login bem-sucedido.
            navigate('/processos');

        } catch (err) {
            // Se o servidor responder com um erro (como 400 Bad Request)
            console.error("Falha no login:", err);
            setError("Falha no login. Verifique o seu e-mail e senha.");
        } finally {
            // Garante que o estado de carregamento é desativado, independentemente do resultado
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen max-w-screen flex items-center justify-center bg-gray-50">
            {/* Envolvemos tudo num elemento <form> e usamos o seu evento onSubmit */}
            <form onSubmit={handleLoginSubmit} className="bg-white shadow-xl rounded-lg p-8 sm:p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700">Entrar</h1>

                {/* Exibe uma mensagem de erro se o login falhar */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* O campo de e-mail é agora um componente controlado */}
                <MyInput
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="o.seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // Adiciona validação básica
                    disabled={isLoading} // Desativa o campo durante o carregamento
                />

                <div className="mb-2">
                    {/* O campo da senha é agora um componente controlado */}
                    <MyInput
                        id="senha"
                        type="password"
                        label="Senha"
                        placeholder="A sua Senha"
                        className="mb-0"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required // Adiciona validação básica
                        disabled={isLoading} // Desativa o campo durante o carregamento
                    />
                    <div className="flex justify-end mt-1">
                        <a href="/" className="text-xs text-emerald-600 hover:text-emerald-700 transition">
                            Esqueci a senha
                        </a>
                    </div>
                </div>

                <div className="mt-4 mb-8">
                    <Checkbox
                        id="lembrar"
                        label="Mantenha-me conectado"
                        disabled={isLoading} // Desativa o campo durante o carregamento
                    />
                </div>

                {/* Container dos botões alterado para uma coluna vertical para corrigir o layout */}
                <div className="flex flex-col gap-3">
                    {/*
                      Este botão agora aciona a submissão do formulário e mostra o estado de carregamento.
                    */}
                    <BotaoEntrar type="submit" className="w-full" isLoading={isLoading}>
                        Entrar
                    </BotaoEntrar>

                    {/*
                      Este botão agora tem a variante 'secondary' para diferenciação visual.
                    */}
                    <BotaoEntrar
                        to="/cadastro"
                        className="w-full"
                        icon={<FaUserPlus size={14} />}
                        variant="secondary"
                    >
                        Cadastre-se
                    </BotaoEntrar>
                </div>
            </form>
        </div>
    );
};

export default TelaLogin;
