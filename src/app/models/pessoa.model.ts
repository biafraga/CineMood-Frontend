export interface Pessoa {
    id: number;
    nome: string;
    biografia: string;
    fotoUrl: string;
}

export interface PessoasPaginadas {
    data: Pessoa[];
    total: number;
}