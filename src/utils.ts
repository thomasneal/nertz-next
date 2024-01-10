import { Round, Score, User } from "./types";

export const updateRounds = (rounds: Round[], players:User[], formData: any): Round[] => {
  let updatedRounds = rounds;
  let newRound: Round = [];

  players.map((player) => {
    if (player.id in formData) {
      const newScore: Score = {
        value: Number(formData[player.id]),
        userId: player.id.toString(),
      }
      newRound.push(newScore);
    }
  });
  updatedRounds.push(newRound);

  return updatedRounds;
}