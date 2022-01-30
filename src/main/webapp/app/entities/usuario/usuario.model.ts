import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';

export interface IUsuario {
  id?: number;
  email?: string;
  nome?: string;
  senha?: string;
  cadastroTrilhas?: ICadastroTrilha[] | null;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public email?: string,
    public nome?: string,
    public senha?: string,
    public cadastroTrilhas?: ICadastroTrilha[] | null
  ) {}
}

export function getUsuarioIdentifier(usuario: IUsuario): number | undefined {
  return usuario.id;
}
