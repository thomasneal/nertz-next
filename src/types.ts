// export type Games = {
//   [id: number]: {
//     id: number;
//     finished: boolean,
//     rounds: Round[],
//     players: User[],
//     totals: Score[]
//   }
// }

export type GameProps = {
  id: number,
  finished: boolean,
  rounds: Round[],
  players: User[],
  totals: Score[]
}

export type Round = Score[];

export type Scores = { [userKey: number]: number };

export type Score = {
  value: number,
  userId: number
}

export type User = {
  id: number,
  name: string
}



