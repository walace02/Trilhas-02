import { ITrilhas } from 'app/entities/trilhas/trilhas.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface ICadastroTrilha {
  id?: number;
  nome?: string;
  descricao?: string | null;
  comprimento?: number;
  avaliacao?: string | null;
  dataHora?: string | null;
  trilhas?: ITrilhas | null;
  usuario?: IUsuario | null;
}

export class CadastroTrilha implements ICadastroTrilha {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string | null,
    public comprimento?: number,
    public avaliacao?: string | null,
    public dataHora?: string | null,
    public trilhas?: ITrilhas | null,
    public usuario?: IUsuario | null
  ) {}
}

export function getCadastroTrilhaIdentifier(cadastroTrilha: ICadastroTrilha): number | undefined {
  return cadastroTrilha.id;
}
