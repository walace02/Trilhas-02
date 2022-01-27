import { IMunicipios } from 'app/entities/municipios/municipios.model';

export interface IPontosCardeais {
  id?: number;
  latitude?: string | null;
  longitude?: string | null;
  municipios?: IMunicipios | null;
}

export class PontosCardeais implements IPontosCardeais {
  constructor(
    public id?: number,
    public latitude?: string | null,
    public longitude?: string | null,
    public municipios?: IMunicipios | null
  ) {}
}

export function getPontosCardeaisIdentifier(pontosCardeais: IPontosCardeais): number | undefined {
  return pontosCardeais.id;
}
