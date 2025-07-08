import { Botao } from "@/components/myui/BotaoPadrao/Botao";
import MyInput from "@/components/myui/Input/Input.tsx";
import React, { useState } from "react";
import axios from 'axios';
import { FiPlus } from "react-icons/fi";

export default function CadastrarAnimal() {
    // --- CONSTANTES DE VALIDAÇÃO ---
    const MAX_FILE_SIZE_MB = 5;
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    // --- ESTADOS DO COMPONENTE ---
    const [formData, setFormData] = useState({
        nome: '',
        raca: '',
        dataNascimento: '',
        especie: '',
        sexo: '',
        porte: 'Pequeno',
    });

    const [errors, setErrors] = useState({
        nome: '',
        raca: '',
        dataNascimento: '',
        especie: '',
        sexo: '',
        foto: '',
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // --- FUNÇÕES ---

    // Função para validar o formulário
    const validateForm = () => {
        const tempErrors = {
            nome: '',
            raca: '',
            dataNascimento: '',
            especie: '',
            sexo: '',
            foto: '',
        };
        let isValid = true;

        if (!formData.nome.trim()) {
            tempErrors.nome = 'O campo Nome é obrigatório.';
            isValid = false;
        }
        if (!formData.raca.trim()) {
            tempErrors.raca = 'O campo Raça é obrigatório.';
            isValid = false;
        }
        if (!formData.dataNascimento.trim()) {
            tempErrors.dataNascimento = 'O campo Data de Nascimento é obrigatório.';
            isValid = false;
        }
        if (!formData.especie) {
            tempErrors.especie = 'Por favor, selecione uma espécie.';
            isValid = false;
        }
        if (!formData.sexo) {
            tempErrors.sexo = 'Por favor, selecione o sexo.';
            isValid = false;
        }
        //
        if (!selectedFile) {
            tempErrors.foto = 'A foto do animal é obrigatória.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Função para lidar com a mudança nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        // Reseta o input para permitir selecionar o mesmo arquivo novamente após um erro
        e.target.value = '';

        if (!file) return;

        // 1. Validação de tipo de arquivo
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setErrors(prev => ({ ...prev, foto: 'Tipo de arquivo inválido. Use JPG, PNG, GIF ou WEBP.' }));
            setSelectedFile(null);
            setPreviewUrl(null);
            return;
        }

        // 2. Validação de tamanho do arquivo
        if (file.size > MAX_FILE_SIZE_MB * 2024 * 2024) {
            setErrors(prev => ({ ...prev, foto: `O arquivo é muito grande. Máximo: ${MAX_FILE_SIZE_MB}MB.` }));
            setSelectedFile(null);
            setPreviewUrl(null);
            return;
        }

        // Se o arquivo for válido, limpa qualquer erro anterior e atualiza o estado
        setErrors(prev => ({ ...prev, foto: '' }));
        setSelectedFile(file);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(URL.createObjectURL(file));
    };


    // Função para lidar com a submissão do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        let imageUrl = '';

        // O 'selectedFile' já foi validado, então podemos prosseguir com o upload
        if (selectedFile) {
            try {
                const imgbbFormData = new FormData();
                imgbbFormData.append('image', selectedFile);

                const imgbbApiKey = '3c5d80cd1bcb454aa7cbb09f05b9e101';

                const imgbbResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                    imgbbFormData
                );

                imageUrl = imgbbResponse.data.data.url;

            } catch (error) {
                console.error('Erro ao fazer upload para o imgbb:', error);
                setSubmitStatus({
                    message: 'Falha ao fazer upload da imagem. Verifique sua chave de API e tente novamente.',
                    type: 'error'
                });
                setIsSubmitting(false);
                return;
            }
        }

        try {
            const dataToSubmit = { ...formData, imageUrl };
            console.log('Dados a serem enviados para o servidor:', dataToSubmit);

            setSubmitStatus({ message: 'Animal cadastrado com sucesso!', type: 'success' });

            // Resetar o formulário
            setFormData({
                nome: '', raca: '', dataNascimento: '', especie: '', sexo: '', porte: 'Pequeno',
            });
            // <-- ALTERAÇÃO: Limpa o erro da foto ao resetar
            setErrors({ nome: '', raca: '', dataNascimento: '', especie: '', sexo: '', foto: '' });
            setSelectedFile(null);
            setPreviewUrl(null);

        } catch (error) {
            console.error('Erro ao enviar para o servidor:', error);
            setSubmitStatus({ message: 'Falha ao cadastrar o animal. Tente novamente.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className="flex flex-col w-full max-w-screen-xl mx-auto gap-6">
            <div className="min-h-screen bg-white flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white p-6 px-5 border-r border-gray-200">
                    <h2 className="text-lg font-semibold mb-10">Minha conta</h2>
                    <nav className="flex flex-col gap-4">
                        <Botao to="/dadospessoais" tsize="text-[18px]" customClasses="w-40">Dados Pessoais</Botao>
                        <Botao to="/processos" tsize="text-[18px]" customClasses="w-40">Processos</Botao>
                        <Botao to="#" tsize="text-[18px]" customClasses="w-40">Cadastrar animal</Botao>
                        <Botao to="/" tsize="text-[18px]" customClasses="w-40">Sair</Botao>
                    </nav>
                </aside>

                {/* Conteúdo Principal */}
                <main className="flex-1 p-10">
                    <form onSubmit={handleSubmit} noValidate>
                        <h1 className="text-2xl font-semibold mb-8">Cadastrar Novo Animal</h1>

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Formulário de Cadastro */}
                            <div className="flex flex-col gap-4 flex-grow">
                                {/* ... (resto do seu formulário, sem alterações aqui) ... */}
                                <div className="flex flex-wrap gap-10 items-start">
                                    <div>
                                        <h3 className="font-medium mb-2 text-sm text-gray-700">Espécie:</h3>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="especie" value="Cachorro"
                                                       onChange={handleChange}
                                                       className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Cachorro
                                            </label>

                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="especie" value="Gato" onChange={handleChange}
                                                       className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Gato
                                            </label>
                                        </div>
                                        {errors.especie && <p className="text-red-600 text-xs mt-1">{errors.especie}</p>}
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2 text-sm text-gray-700">Sexo:</h3>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="sexo" value="Macho" onChange={handleChange}
                                                       className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Macho
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="sexo" value="Femea" onChange={handleChange}
                                                       className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Fêmea
                                            </label>
                                        </div>
                                        {errors.sexo && <p className="text-red-600 text-xs mt-1">{errors.sexo}</p>}
                                    </div>
                                </div>

                                <MyInput
                                    id="nome"
                                    name="nome"
                                    label="Nome"
                                    type="text"
                                    placeholder="Digite o nome do animal"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    error={errors.nome}
                                    validationType="letters"
                                />

                                <MyInput
                                    id="raca"
                                    name="raca"
                                    label="Raça"
                                    type="text"
                                    placeholder="Ex: Sem Raça Definida (SRD)"
                                    value={formData.raca}
                                    onChange={handleChange}
                                    error={errors.raca}
                                />

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-1/2">
                                        <MyInput
                                            id="dataNascimento"
                                            name="dataNascimento"
                                            label="Data de Nascimento"
                                            type="text"
                                            placeholder="01/01/2020"
                                            value={formData.dataNascimento}
                                            onChange={handleChange}
                                            error={errors.dataNascimento}
                                            applyDateMask
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label htmlFor="porte" className="block text-sm font-medium mb-1 text-gray-700">Porte</label>
                                        <select id="porte" name="porte" value={formData.porte} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none border-gray-300">
                                            <option>Pequeno</option>
                                            <option>Médio</option>
                                            <option>Grande</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Upload de Foto */}
                            <div className="flex flex-col"> {/* <-- ALTERAÇÃO: Wrapper para o upload e a mensagem de erro */}
                                <label htmlFor="file-upload" className={`flex flex-col items-center justify-center w-full lg:w-72 h-72 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-cover bg-center ${errors.foto ? 'border-red-500' : 'border-gray-300'}`} style={{ backgroundImage: previewUrl ? `url(${previewUrl})` : 'none' }}>
                                    {!previewUrl && (
                                        <div className="text-center">
                                            <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3">
                                                <FiPlus className="text-3xl text-gray-500" />
                                            </div>
                                            <p className="text-gray-500">Adicione uma Foto!</p>
                                        </div>
                                    )}
                                    <input id="file-upload" name="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                </label>

                                {errors.foto && <p className="text-red-600 text-xs mt-2 text-center w-full lg:w-72">{errors.foto}</p>}
                            </div>
                        </div>

                        {/* Botão Salvar e Mensagens de Status */}
                        <div className="mt-8">
                            <button type="submit" disabled={isSubmitting} className="bg-emerald-400 text-white font-bold py-2 px-10 rounded-md hover:bg-emerald-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Salvando...' : 'Salvar'}
                            </button>
                            {submitStatus && (
                                <p className={`mt-4 text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {submitStatus.message}
                                </p>
                            )}
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}