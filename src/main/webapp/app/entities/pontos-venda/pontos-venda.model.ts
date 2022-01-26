import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { ITrilhas } from 'app/entities/trilhas/trilhas.model';

export interface IPontosVenda {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
  avaliacao?: number | null;
  tiposPontosVenda?: string | null;
  pontosCardeais?: IPontosCardeais | null;
  fotografias?: IFotografias[] | null;
  trilhas?: ITrilhas | null;
}

export class PontosVenda implements IPontosVenda {
  constructor(
    public id?: number,
    public nome?: string | null,
    public descricao?: string | null,
    public avaliacao?: number | null,
    public tiposPontosVenda?: string | null,
    public pontosCardeais?: IPontosCardeais | null,
    public fotografias?: IFotografias[] | null,
    public trilhas?: ITrilhas | null
  ) {}
}

export function getPontosVendaIdentifier(pontosVenda: IPontosVenda): number | undefined {
  return pontosVenda.id;
}
