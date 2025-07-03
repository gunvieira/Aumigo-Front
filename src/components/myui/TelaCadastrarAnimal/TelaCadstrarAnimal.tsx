import { Botao } from "@/components/myui/BotaoPadrao/Botao";
import MyInput from "@/components/myui/Input/Input.tsx"; // Importando o axios
import { useState } from "react";
import axios from 'axios'; // Importando o axios

export default function CadastrarAnimal() {
    // Estado para gerenciar os valores do formulário
    const [formData, setFormData] = useState({
        nome: '',
        raca: '',
        dataNascimento: '',
        especie: '',
        sexo: '',
        porte: 'Pequeno',
    });

    // Estado para o arquivo de imagem
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Estados para feedback da submissão
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


    // Função para lidar com a mudança nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Função para lidar com a seleção do arquivo de imagem
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            // Limpa a URL de objeto anterior para evitar vazamento de memória
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        let imageUrl = '';

        // Passo 1: Se uma imagem foi selecionada, faz o upload para o imgbb
        if (selectedFile) {
            try {
                const imgbbFormData = new FormData();
                imgbbFormData.append('image', selectedFile);

                // --- IMPORTANTE ---
                // Substitua a string abaixo pela sua chave de API do imgbb.
                const imgbbApiKey = '3c5d80cd1bcb454aa7cbb09f05b9e101';

                const imgbbResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                    imgbbFormData
                );

                imageUrl = imgbbResponse.data.data.url;

            } catch (error) {
                console.error('Erro ao fazer upload para o imgbb:', error);
                setSubmitStatus({ message: 'Falha ao fazer upload da imagem. Verifique sua chave de API e tente novamente.', type: 'error' });
                setIsSubmitting(false);
                return; // Interrompe a submissão se o upload da imagem falhar
            }
        }

        // Passo 2: Envia os dados do formulário (com a URL da imagem) para o seu servidor
        try {
            const dataToSubmit = {
                ...formData,
                imageUrl: imageUrl, // Adiciona a URL da imagem aos dados
            };

            // Imprime os dados no console antes de enviar
            console.log('Dados a serem enviados para o servidor:', dataToSubmit);

            // Substitua '/api/animais' pelo seu endpoint real
            const response = await axios.post('/api/animais', dataToSubmit, {
                headers: {
                    'Content-Type': 'application/json', // O conteúdo agora é JSON
                },
            });

            console.log('Success:', response.data);
            setSubmitStatus({ message: 'Animal cadastrado com sucesso!', type: 'success' });

            // Opcional: resetar o formulário após o sucesso
            setFormData({
                nome: '', raca: '', dataNascimento: '', especie: '', sexo: '', porte: 'Pequeno',
            });
            setSelectedFile(null);
            setPreviewUrl(null);

        } catch (error) {
            console.error('Erro ao enviar para o servidor:', error);
            setSubmitStatus({ message: 'Falha ao cadastrar o animal. Tente novamente.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };


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
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-semibold mb-8">Cadastrar Novo Animal</h1>

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Formulário de Cadastro */}
                            <div className="flex flex-col gap-4 flex-grow">
                                {/* ... campos de espécie e sexo ... */}
                                <div className="flex flex-wrap gap-10 items-center">
                                    <div>
                                        <h3 className="font-medium mb-2 text-sm text-gray-700">Espécie:</h3>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="especie" value="Cachorro" onChange={handleChange} className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Cachorro
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="especie" value="Gato" onChange={handleChange} className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Gato
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2 text-sm text-gray-700">Sexo:</h3>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="sexo" value="Macho" onChange={handleChange} className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Macho
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="sexo" value="Femea" onChange={handleChange} className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Fêmea
                                            </label>
                                        </div>
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
                                    validationType="letters"/>

                                <MyInput id="raca" name="raca" label="Raça" type="text" placeholder="Ex: Sem Raça Definida (SRD)" value={formData.raca} onChange={handleChange}/>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-1/2">
                                        <MyInput id="dataNascimento" name="dataNascimento" label="Data de Nascimento" type="text" placeholder="01/01/2020" value={formData.dataNascimento} onChange={handleChange}/>
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
                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full lg:w-72 h-72 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-cover bg-center" style={{backgroundImage: `url(${previewUrl})`}}>
                                {!previewUrl && (
                                    <div className="text-center">
                                        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3">
                                            <span className="text-2xl text-gray-500">+</span>
                                        </div>
                                        <p className="text-gray-500">Adicione uma Foto!</p>
                                    </div>
                                )}
                                <input id="file-upload" name="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
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
