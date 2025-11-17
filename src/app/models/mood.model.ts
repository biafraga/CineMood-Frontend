export interface Mood {
    id: number;
    nome: string;
    descricao: string;
    iconeUrl: string;
}

export interface MoodsPaginados {
    data: Mood [];
    total: number;
}