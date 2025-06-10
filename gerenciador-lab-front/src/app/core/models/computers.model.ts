import { Laboratory } from './laboratory.model';

export interface ComputersResponse {
  computador: Computers;  // Aqui é onde a resposta vem com 'computador'
}

export interface Computers {
  id?: number;
  nome: string;
  patrimonio: string;
  retirado: boolean;
  laboratory_id: number;
  laboratorio?: Laboratory;  // Relacionamento com o laboratório
}