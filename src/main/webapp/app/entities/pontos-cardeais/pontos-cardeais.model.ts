import { IMunicipios } from 'app/entities/municipios/municipios.model';

export interface IPontosCardeais {
  id?: number;
  latitude?: number | null;
  longitude?: number | null;
  municipios?: IMunicipios | null;
}

export class PontosCardeais implements IPontosCardeais {
  constructor(
    public id?: number,
    public latitude?: number | null,
    public longitude?: number | null,
    public municipios?: IMunicipios | null
  ) {}
}

export function getPontosCardeaisIdentifier(pontosCardeais: IPontosCardeais): number | undefined {
  return pontosCardeais.id;
}
