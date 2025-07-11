// src/interfaces/Processo.ts

export interface IProcesso {
    idAdocao: number;
    dataAdocao: string;
    statusAdocao: 'PENDENTE' | 'APROVADO' | 'RECUSADO' | 'CADASTRADO';
    animal: {
        idAnimal: number;
        nome: string;
        midiaImagem: string;
        porte: string;
        sexo: string;
        raca: string
        especie: string;
    } | null; // Permite que 'animal' seja nulo
    usuario: {
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
    } | null; // Permite que 'usuario' seja nulo
}