import React from 'react';

// Estende os atributos de input HTML padrão para melhor segurança de tipos e preenchimento automático.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    validationType?: 'letters' | 'numbers';
    applyCpfMask?: boolean;
    applyDateMask?: boolean; // Nova propriedade para a máscara de data
    error?: string;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const MyInput: React.FC<InputProps> = ({
                                           id,
                                           label,
                                           validationType,
                                           applyCpfMask,
                                           applyDateMask, // Desestrutura a nova propriedade
                                           error,
                                           className = '',
                                           labelClassName = '',
                                           inputClassName = '',
                                           onChange,
                                           ...props
                                       }) => {
    /**
     * Aplica uma máscara de CPF (###.###.###-##) à string de entrada.
     * @param value A string de entrada original.
     * @returns A string formatada.
     */
    const handleCpfMask = (value: string): string => {
        return value
            .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .substring(0, 14); // Garante que o comprimento não exceda a máscara
    };

    /**
     * Aplica uma máscara de Data (dd/mm/aaaa) à string de entrada.
     * @param value A string de entrada original.
     * @returns A string formatada.
     */
    const handleDateMask = (value: string): string => {
        return value
            .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
            .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona uma barra após o dia
            .replace(/(\d{2}\/)(\d{2})(\d)/, '$1$2/$3') // Adiciona uma barra após o mês
            .substring(0, 10); // Limita a 10 caracteres (dd/mm/aaaa)
    };

    /**
     * Lida com o evento onChange do input, aplicando validações e máscaras conforme necessário.
     * Cria um novo objeto semelhante a um evento para passar ao manipulador onChange do componente pai,
     * garantindo a compatibilidade com bibliotecas de formulários.
     * @param e O evento React ChangeEvent original do elemento input.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.currentTarget;
        let { value } = e.currentTarget;

        // Aplica o tipo de validação básico para restringir caracteres
        if (validationType === 'letters') {
            value = value.replace(/[^a-zA-Z\s]/g, '');
        } else if (validationType === 'numbers' || applyCpfMask || applyDateMask) {
            // Para máscaras ou validação de números, permite apenas dígitos inicialmente
            value = value.replace(/\D/g, '');
        }

        // Aplica as máscaras se especificadas.
        if (applyCpfMask) {
            value = handleCpfMask(value);
        }
        if (applyDateMask) {
            value = handleDateMask(value);
        }

        // Cria um novo objeto simples que imita a estrutura do evento necessária pelo manipulador pai.
        const newEvent = {
            target: {
                name: name,
                value: value,
            },
        };

        if (onChange) {
            // Passa o objeto "fabricado" para o manipulador do pai.
            // O cast (as ...) é necessário para satisfazer o TypeScript, pois nosso objeto não é um evento sintético completo do React.
            onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
        }
    };

    // Define dinamicamente a cor da borda para vermelho se houver um erro.
    const errorBorderClass = error ? 'border-red-500' : 'border-gray-300';

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={id} className={`block text-sm font-medium mb-1 text-gray-700 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errorBorderClass} ${inputClassName}`}
                onChange={handleChange}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export default MyInput;
