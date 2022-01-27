import dayjs from 'dayjs/esm';
import { ISituacoesTrilha } from 'app/entities/situacoes-trilha/situacoes-trilha.model';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { IPontosVenda } from 'app/entities/pontos-venda/pontos-venda.model';
import { IPontosTuristicos } from 'app/entities/pontos-turisticos/pontos-turisticos.model';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface ICadastroTrilha {
  id?: number;
  nome?: string;
  descricao?: string | null;
  comprimento?: number;
  dataHora?: dayjs.Dayjs | null;
  situacoesTrilha?: ISituacoesTrilha | null;
  pontosCardeais?: IPontosCardeais | null;
  pontosVendas?: IPontosVenda[] | null;
  pontosTuristicos?: IPontosTuristicos[] | null;
  fotografias?: IFotografias[] | null;
  usuario?: IUsuario | null;
}

export class CadastroTrilha implements ICadastroTrilha {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string | null,
    public comprimento?: number,
    public dataHora?: dayjs.Dayjs | null,
    public situacoesTrilha?: ISituacoesTrilha | null,
    public pontosCardeais?: IPontosCardeais | null,
    public pontosVendas?: IPontosVenda[] | null,
    public pontosTuristicos?: IPontosTuristicos[] | null,
    public fotografias?: IFotografias[] | null,
    public usuario?: IUsuario | null
  ) {}
}

export function getCadastroTrilhaIdentifier(cadastroTrilha: ICadastroTrilha): number | undefined {
  return cadastroTrilha.id;
}
