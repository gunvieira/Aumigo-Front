// 1. Imports organizados por tipo
import { useState } from 'react';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

import BotaoEntrar from '@/components/myui/BotaoPadrao/Botao.tsx';
import MyInput from '@/components/myui/Input/Input.tsx';

export default function TelaCadastro() {
    // Adicionado estado para controlar o carregamento do formulário
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        // Dados Pessoais
        nome: '',
        email: '',
        senha: '',
        telefone: '', // Mantido como 'telefone' para consistência
        cpf: '',
        tipoUsuario: 1,
        endereco: {
            logradouro: '',
            bairro: '',
            numero: '',
            complemento: '',
            cep: '',
            cidade: '',
            uf: '', // CORREÇÃO: Campo 'uf' adicionado ao estado
        }
    });

    // A função handleChange está correta e será mantida
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        if (keys.length === 1) {
            const key = keys[0] as keyof typeof formData;
            if (key !== 'endereco') {
                setFormData(prevState => ({
                    ...prevState,
                    [key]: value,
                }));
            }
        } else {
            const groupKey = keys[0];
            const fieldKey = keys[1];
            if (groupKey === 'endereco' && typeof formData.endereco === 'object' && formData.endereco !== null) {
                setFormData(prevState => ({
                    ...prevState,
                    endereco: {
                        ...prevState.endereco,
                        [fieldKey]: value,
                    },
                }));
            }
        }
    };

    // Função de envio com controle de loading
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Ativa o loading
        console.log("Dados a serem enviados:", JSON.stringify(formData, null, 2));

        try {
            const response = await fetch('http://192.168.31.37:8080/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso! ✅');
            } else {
                const errorData = await response.json();
                alert(`Erro no cadastro: ${errorData.message || 'Tente novamente.'} ❌`);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Não foi possível conectar ao servidor. 🔌');
        } finally {
            setIsLoading(false); // Desativa o loading, mesmo se der erro
        }
    };

    return (
        <div className="min-h-screen max-w-screen flex items-center justify-center p-4">
            <div className="shadow-lg rounded-md p-6 md:p-10 w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-emerald-700 text-center">Cadastre-se</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:gap-8">
                        {/* --- COLUNA 1: DADOS PESSOAIS --- */}
                        <div className="w-full md:w-1/2">
                            {/* CORREÇÃO: Adicionado o atributo 'name' para ligar ao handleChange */}
                            <MyInput
                                id="nome"
                                name="nome"
                                type="text"
                                label="Nome*"
                                placeholder="Nome completo"
                                value={formData.nome}
                                onChange={handleChange}
                            />
                            <MyInput
                                id="cpf"
                                name="cpf"
                                type="text"
                                label="CPF*"
                                placeholder="000.000.000-00"
                                value={formData.cpf}
                                onChange={handleChange}
                            />
                            {/* CORREÇÃO: 'id' e 'name' ajustados para 'telefone' para corresponder ao estado */}
                            <MyInput
                                id="telefone"
                                name="telefone"
                                type="text"
                                label="Celular"
                                placeholder="(00) 90000-0000"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                            <MyInput
                                id="email"
                                name="email"
                                type="email"
                                label="Email*"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <MyInput
                                id="senha"
                                name="senha"
                                type="password"
                                label="Senha*"
                                placeholder="Crie uma senha forte"
                                value={formData.senha}
                                onChange={handleChange}
                            />
                        </div>

                        {/* --- LINHA DIVISÓRIA --- */}
                        <div className="hidden md:block border-l border-gray-200"></div>
                        <hr className="my-6 border-gray-200 md:hidden" />

                        {/* --- COLUNA 2: ENDEREÇO --- */}
                        <div className="w-full md:w-1/2">
                            <MyInput
                                id="endereco.cep"
                                name="endereco.cep"
                                type="text"
                                label="CEP*"
                                placeholder="00000-000"
                                value={formData.endereco.cep}
                                onChange={handleChange}
                            />
                            <MyInput
                                id="endereco.logradouro"
                                name="endereco.logradouro"
                                type="text"
                                label="Endereço*"
                                placeholder="Rua, Avenida, etc."
                                value={formData.endereco.logradouro}
                                onChange={handleChange}
                            />
                            <div className="flex flex-row gap-4">
                                <MyInput
                                    id="endereco.numero"
                                    name="endereco.numero"
                                    type="text"
                                    label="Número*"
                                    placeholder="Ex: 123"
                                    value={formData.endereco.numero}
                                    onChange={handleChange}
                                />
                                <MyInput
                                    id="endereco.complemento"
                                    name="endereco.complemento"
                                    type="text"
                                    label="Complemento"
                                    placeholder="Apto, Bloco"
                                    value={formData.endereco.complemento}
                                    onChange={handleChange}
                                />
                            </div>
                            <MyInput
                                id="endereco.bairro"
                                name="endereco.bairro"
                                type="text"
                                label="Bairro*"
                                placeholder="Seu bairro"
                                value={formData.endereco.bairro}
                                onChange={handleChange}
                            />
                            <div className="flex flex-row gap-4">
                                <MyInput
                                    id="endereco.cidade"
                                    name="endereco.cidade"
                                    type="text"
                                    label="Cidade*"
                                    placeholder="Sua cidade"
                                    value={formData.endereco.cidade}
                                    onChange={handleChange}
                                />
                                {/* CORREÇÃO: Adicionado 'name' e 'value' para conectar o campo UF */}
                                <MyInput
                                    id="endereco.uf"
                                    name="endereco.uf"
                                    type="text"
                                    label="UF*"
                                    placeholder="UF"
                                    value={formData.endereco.uf}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <BotaoEntrar
                            type="submit"
                            className="w-full md:w-auto"
                            isLoading={isLoading} // Passando o estado de loading para o botão
                            icon={!isLoading && <FaRegArrowAltCircleRight size={14} />}
                        >
                            {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                        </BotaoEntrar>
                    </div>
                </form>
            </div>
        </div>
    );
}