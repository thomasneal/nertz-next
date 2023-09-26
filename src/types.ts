export type GameProps = {
  id: number,
  finished: boolean,
  rounds: Round[],
  players: User[]
}

export type Round = {
  id: number,
  scores: Score[]
}

export type Score = {
  value: number,
  user: User
}

export type User = {
  id: number,
  name: string
}
