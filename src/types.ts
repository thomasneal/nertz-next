export type GameProps = {
  id: number,
  finished: boolean,
  rounds: Round[],
  players: User[]
}

export type Round = Score[];

export type Score = {
  value: number,
  userId: string
}

export type User = {
  id: number,
  name: string
}

export type Total = {
  name: string,
  score: number
}

