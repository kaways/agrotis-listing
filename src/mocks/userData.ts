export interface Propriedade {
  id: number;
  nome: string;
}

export interface Laboratorio {
  id: number;
  nome: string;
}

export interface Usuario {
  id: number;
  nome: string;
  dataInicial: string;
  dataFinal: string;
  propriedades: Propriedade[];
  laboratorio: Laboratorio;
  observacoes: string;
}

export const UserData: Usuario[] = [
  {
    id: 10,
    nome: "Jon doe",
    dataInicial: "2022-02-02T17:41:44Z",
    dataFinal: "2022-02-02T17:41:44Z",
    propriedades: [
      {
        id: 1,
        nome: "Fazenda Agrotis",
      },
    ],
    laboratorio: {
      id: 3,
      nome: "Osborne Agro",
    },
    observacoes: "Observacao exemplo de teste",
  },
  {
    id: 11,
    nome: "Kaway Soares",
    dataInicial: "2022-02-02T17:41:44Z",
    dataFinal: "2022-02-02T17:41:44Z",
    propriedades: [
      {
        id: 1,
        nome: "Fazenda Agrotis",
      },
    ],
    laboratorio: {
      id: 3,
      nome: "Osborne Agro",
    },
    observacoes: "Observacao exemplo de teste",
  },
];
