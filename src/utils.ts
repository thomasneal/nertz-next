import { Round, Score, User } from "./types";

export const updateRounds = (rounds: Round[], players:User[], formData: FormData): Round[] => {
  let updatedRounds = rounds;
  let newRound: Round = [];

  players.map((player) => {
    if (formData.get(`player-${player.id}`)) {
      const newScore: Score = {
        value: Number(formData.get(`player-${player.id}`)),
        userId: player.id.toString()
      }
      newRound.push(newScore);
    }
  });
  updatedRounds.push(newRound);

  return updatedRounds;
}