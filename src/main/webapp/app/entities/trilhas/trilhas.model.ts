import { ISituacoesTrilha } from 'app/entities/situacoes-trilha/situacoes-trilha.model';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { IPontosVenda } from 'app/entities/pontos-venda/pontos-venda.model';
import { IPontosTuristicos } from 'app/entities/pontos-turisticos/pontos-turisticos.model';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';

export interface ITrilhas {
  id?: number;
  nome?: string;
  descricao?: string | null;
  comprimento?: number;
  avaliacao?: string | null;
  situacoesTrilha?: ISituacoesTrilha | null;
  pontosCardeais?: IPontosCardeais | null;
  pontosVendas?: IPontosVenda[] | null;
  pontosTuristicos?: IPontosTuristicos[] | null;
  fotografias?: IFotografias[] | null;
}

export class Trilhas implements ITrilhas {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string | null,
    public comprimento?: number,
    public avaliacao?: string | null,
    public situacoesTrilha?: ISituacoesTrilha | null,
    public pontosCardeais?: IPontosCardeais | null,
    public pontosVendas?: IPontosVenda[] | null,
    public pontosTuristicos?: IPontosTuristicos[] | null,
    public fotografias?: IFotografias[] | null
  ) {}
}

export function getTrilhasIdentifier(trilhas: ITrilhas): number | undefined {
  return trilhas.id;
}
