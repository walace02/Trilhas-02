import { ITrilha } from 'app/entities/trilha/trilha.model';

export interface ISituacoesTrilha {
  id?: number;
  situacao?: boolean | null;
  trilha?: ITrilha | null;
}

export class SituacoesTrilha implements ISituacoesTrilha {
  constructor(public id?: number, public situacao?: boolean | null, public trilha?: ITrilha | null) {
    this.situacao = this.situacao ?? false;
  }
}

export function getSituacoesTrilhaIdentifier(situacoesTrilha: ISituacoesTrilha): number | undefined {
  return situacoesTrilha.id;
}
