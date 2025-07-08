


import axios from "axios";
import React from 'react'; // É uma boa prática importar React ao usar JSX

export default function Teste() {
    // A tipagem do evento já está correta para um 'onSubmit' de formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Impede o recarregamento da página, que é o padrão do form

        try {
            const response = await axios.get('http://localhost:8080/2');
            sessionStorage.setItem('id', String(response.data.idUsuario));
            alert('Cadastro realizado com sucesso! ✅');
            console.log('Dados da resposta:', response.data);
            sessionStorage.setItem('tipoUsuario', '1');

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Erro de resposta do servidor:', error.response.data);
                // Tenta usar a mensagem de erro da API, senão uma mensagem padrão
                const errorMessage = error.response.data.message || 'Tente novamente.';
                alert(`Erro no cadastro: ${errorMessage} ❌`);
            } else {
                console.error('Erro de rede:', error);
                alert('Não foi possível conectar ao servidor. 🔌');
            }
        }
    };

    return (
        // Envolve o botão em um formulário e usa o evento onSubmit
        <form onSubmit={handleSubmit}>
            {/* O type="submit" faz com que o botão acione o onSubmit do formulário */}
            <button type="submit">Teste</button>
        </form>
    );
}