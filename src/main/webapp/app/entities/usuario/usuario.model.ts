import { ITrilha } from 'app/entities/trilha/trilha.model';

export interface IUsuario {
  id?: number;
  email?: string;
  nome?: string;
  senha?: string;
  trilhas?: ITrilha[] | null;
}

export class Usuario implements IUsuario {
  constructor(public id?: number, public email?: string, public nome?: string, public senha?: string, public trilhas?: ITrilha[] | null) {}
}

export function getUsuarioIdentifier(usuario: IUsuario): number | undefined {
  return usuario.id;
}
