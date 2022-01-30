import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';
import { IPontosTuristicos } from 'app/entities/pontos-turisticos/pontos-turisticos.model';
import { IPontosVenda } from 'app/entities/pontos-venda/pontos-venda.model';

export interface IFotografias {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
  autor?: string | null;
  avaliacao?: string | null;
  cadastroTrilha?: ICadastroTrilha | null;
  pontosTuristicos?: IPontosTuristicos | null;
  pontosVenda?: IPontosVenda | null;
}

export class Fotografias implements IFotografias {
  constructor(
    public id?: number,
    public nome?: string | null,
    public descricao?: string | null,
    public autor?: string | null,
    public avaliacao?: string | null,
    public cadastroTrilha?: ICadastroTrilha | null,
    public pontosTuristicos?: IPontosTuristicos | null,
    public pontosVenda?: IPontosVenda | null
  ) {}
}

export function getFotografiasIdentifier(fotografias: IFotografias): number | undefined {
  return fotografias.id;
}
