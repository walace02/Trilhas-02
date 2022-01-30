import { IMunicipios } from 'app/entities/municipios/municipios.model';
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';

export interface IPontosCardeais {
  id?: number;
  latitude?: string | null;
  longitude?: string | null;
  municipios?: IMunicipios | null;
  cadastroTrilha?: ICadastroTrilha | null;
}

export class PontosCardeais implements IPontosCardeais {
  constructor(
    public id?: number,
    public latitude?: string | null,
    public longitude?: string | null,
    public municipios?: IMunicipios | null,
    public cadastroTrilha?: ICadastroTrilha | null
  ) {}
}

export function getPontosCardeaisIdentifier(pontosCardeais: IPontosCardeais): number | undefined {
  return pontosCardeais.id;
}
