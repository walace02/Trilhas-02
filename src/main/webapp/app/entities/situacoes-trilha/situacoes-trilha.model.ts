import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';

export interface ISituacoesTrilha {
  id?: number;
  situacao?: boolean | null;
  cadastroTrilha?: ICadastroTrilha | null;
}

export class SituacoesTrilha implements ISituacoesTrilha {
  constructor(public id?: number, public situacao?: boolean | null, public cadastroTrilha?: ICadastroTrilha | null) {
    this.situacao = this.situacao ?? false;
  }
}

export function getSituacoesTrilhaIdentifier(situacoesTrilha: ISituacoesTrilha): number | undefined {
  return situacoesTrilha.id;
}
