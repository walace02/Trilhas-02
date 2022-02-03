import { ITrilha } from 'app/entities/trilha/trilha.model';

export interface IPontosCardeais {
  id?: number;
  latitude?: string | null;
  longitude?: string | null;
  trilha?: ITrilha | null;
}

export class PontosCardeais implements IPontosCardeais {
  constructor(public id?: number, public latitude?: string | null, public longitude?: string | null, public trilha?: ITrilha | null) {}
}

export function getPontosCardeaisIdentifier(pontosCardeais: IPontosCardeais): number | undefined {
  return pontosCardeais.id;
}
