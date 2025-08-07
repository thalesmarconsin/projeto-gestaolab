export interface Laboratory {
  id?: number;
  nome: string;
  localizacao?: string;
  status?: boolean;
  descricao?: string; // Adicionando a propriedade descricao
  quantidadeComputadores?: number; // Adicionando a propriedade quantidadeComputadores
}