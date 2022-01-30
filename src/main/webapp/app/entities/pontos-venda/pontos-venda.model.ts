import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';

export interface IPontosVenda {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
  avaliacao?: string | null;
  tiposPontosVenda?: string | null;
  pontosCardeais?: IPontosCardeais | null;
  fotografias?: IFotografias[] | null;
  cadastroTrilha?: ICadastroTrilha | null;
}

export class PontosVenda implements IPontosVenda {
  constructor(
    public id?: number,
    public nome?: string | null,
    public descricao?: string | null,
    public avaliacao?: string | null,
    public tiposPontosVenda?: string | null,
    public pontosCardeais?: IPontosCardeais | null,
    public fotografias?: IFotografias[] | null,
    public cadastroTrilha?: ICadastroTrilha | null
  ) {}
}

export function getPontosVendaIdentifier(pontosVenda: IPontosVenda): number | undefined {
  return pontosVenda.id;
}
