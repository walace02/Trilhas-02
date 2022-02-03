import { ITrilha } from 'app/entities/trilha/trilha.model';
import { IPontosVenda } from 'app/entities/pontos-venda/pontos-venda.model';
import { IPontosTuristicos } from 'app/entities/pontos-turisticos/pontos-turisticos.model';

export interface IFotografias {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
  autor?: string | null;
  avaliacao?: string | null;
  fotografias?: ITrilha[] | null;
  fotografias?: IPontosVenda[] | null;
  fotografias?: IPontosTuristicos[] | null;
}

export class Fotografias implements IFotografias {
  constructor(
    public id?: number,
    public nome?: string | null,
    public descricao?: string | null,
    public autor?: string | null,
    public avaliacao?: string | null,
    public fotografias?: ITrilha[] | null,
    public fotografias?: IPontosVenda[] | null,
    public fotografias?: IPontosTuristicos[] | null
  ) {}
}

export function getFotografiasIdentifier(fotografias: IFotografias): number | undefined {
  return fotografias.id;
}
