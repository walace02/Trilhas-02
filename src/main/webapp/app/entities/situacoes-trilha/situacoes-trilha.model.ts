export interface ISituacoesTrilha {
  id?: number;
  situacao?: boolean | null;
}

export class SituacoesTrilha implements ISituacoesTrilha {
  constructor(public id?: number, public situacao?: boolean | null) {
    this.situacao = this.situacao ?? false;
  }
}

export function getSituacoesTrilhaIdentifier(situacoesTrilha: ISituacoesTrilha): number | undefined {
  return situacoesTrilha.id;
}
