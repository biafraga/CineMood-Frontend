export interface Filme {
    id: number;
    titulo: string;
    sinopse: string;
    anoLancamento: number;
    posterUrl: string;
    fraseEfeito: string;
}

export interface FilmesPaginados {
    data: Filme [];
    total: number;
}