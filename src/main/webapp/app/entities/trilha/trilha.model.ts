import dayjs from 'dayjs/esm';
import { ISituacoesTrilha } from 'app/entities/situacoes-trilha/situacoes-trilha.model';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';

export interface ITrilha {
  id?: number;
  nomeTrilha?: string;
  nomeMunicipio?: string;
  descricao?: string | null;
  comprimento?: number;
  data?: dayjs.Dayjs | null;
  situacoesTrilhas?: ISituacoesTrilha[] | null;
  pontosCardeais?: IPontosCardeais[] | null;
  usuario?: IUsuario | null;
  fotografias?: IFotografias | null;
}

export class Trilha implements ITrilha {
  constructor(
    public id?: number,
    public nomeTrilha?: string,
    public nomeMunicipio?: string,
    public descricao?: string | null,
    public comprimento?: number,
    public data?: dayjs.Dayjs | null,
    public situacoesTrilhas?: ISituacoesTrilha[] | null,
    public pontosCardeais?: IPontosCardeais[] | null,
    public usuario?: IUsuario | null,
    public fotografias?: IFotografias | null
  ) {}
}

export function getTrilhaIdentifier(trilha: ITrilha): number | undefined {
  return trilha.id;
}
