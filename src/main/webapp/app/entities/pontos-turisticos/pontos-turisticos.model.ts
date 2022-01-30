import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';

export interface IPontosTuristicos {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
  avaliacao?: string | null;
  tiposPontosTuristicos?: string | null;
  pontosCardeais?: IPontosCardeais | null;
  fotografias?: IFotografias[] | null;
  cadastroTrilha?: ICadastroTrilha | null;
}

export class PontosTuristicos implements IPontosTuristicos {
  constructor(
    public id?: number,
    public nome?: string | null,
    public descricao?: string | null,
    public avaliacao?: string | null,
    public tiposPontosTuristicos?: string | null,
    public pontosCardeais?: IPontosCardeais | null,
    public fotografias?: IFotografias[] | null,
    public cadastroTrilha?: ICadastroTrilha | null
  ) {}
}

export function getPontosTuristicosIdentifier(pontosTuristicos: IPontosTuristicos): number | undefined {
  return pontosTuristicos.id;
}
