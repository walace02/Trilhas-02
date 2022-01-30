export interface IMunicipios {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
}

export class Municipios implements IMunicipios {
  constructor(public id?: number, public nome?: string | null, public descricao?: string | null) {}
}

export function getMunicipiosIdentifier(municipios: IMunicipios): number | undefined {
  return municipios.id;
}
