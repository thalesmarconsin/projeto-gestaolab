import { Laboratory } from './laboratory.model';

export interface Computers {
  id?: number;
  nome: string;
  patrimonio: string;
  retirado: boolean;
  laboratory_id: number;
  laboratorio?: Laboratory;
}
