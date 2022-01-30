import dayjs from 'dayjs/esm';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { ISituacoesTrilha } from 'app/entities/situacoes-trilha/situacoes-trilha.model';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface ICadastroTrilha {
  id?: number;
  nomeTrilha?: string;
  nomeMunicipio?: string;
  descricao?: string | null;
  comprimento?: number;
  dataHora?: dayjs.Dayjs | null;
  fotografias?: IFotografias[] | null;
  situacoesTrilhas?: ISituacoesTrilha[] | null;
  pontosCardeais?: IPontosCardeais[] | null;
  usuario?: IUsuario | null;
}

export class CadastroTrilha implements ICadastroTrilha {
  constructor(
    public id?: number,
    public nomeTrilha?: string,
    public nomeMunicipio?: string,
    public descricao?: string | null,
    public comprimento?: number,
    public dataHora?: dayjs.Dayjs | null,
    public fotografias?: IFotografias[] | null,
    public situacoesTrilhas?: ISituacoesTrilha[] | null,
    public pontosCardeais?: IPontosCardeais[] | null,
    public usuario?: IUsuario | null
  ) {}
}

export function getCadastroTrilhaIdentifier(cadastroTrilha: ICadastroTrilha): number | undefined {
  return cadastroTrilha.id;
}
