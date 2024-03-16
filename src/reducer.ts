'use client';

import { GameProps, Scores } from "./types";
import { updateRounds } from "./utils";

type State = {
  games: GameProps[];
}

type CreateGame = {
  type: "CREATE_GAME",
};

type HydrateGames = {
  type: "HYDRATE_GAMES",
};

type CreateRound = {
  type: "CREATE_ROUND",
  id: number,
  data: Scores,
};

type UpdateGames = {
  type: "UPDATE_GAMES",
};

type DeleteGame = {
  type: "DELETE_GAME",
  id: number,
};

export type Actions = CreateGame | HydrateGames | UpdateGames | CreateRound | DeleteGame;

export const generateNewGame = (id: number): GameProps => ({
    id,
    finished: false,
    rounds: [
      [
          { value: 10,
            userId: 1
          },
          { value: 16,
            userId: 2
          }
      ],
      [
        { value: -2,
          userId: 1
        },
        { value: 14,
          userId: 2
        }
      ],
    ], 
    players: [
      { id: 1, name: "Tom"},
      { id: 2, name: "Amanda"}
    ],
    totals: [
      { userId: 1, value: 8},
      { userId: 2, value: 30}
    ],
  });

  export function getFromLocalStorage() {
    const items = localStorage.getItem('games');
    return items ? JSON.parse(items) : [];
  }

export default function GameReducer(state: State, action: Actions) {
  switch (action.type) {
    case "HYDRATE_GAMES": {
      const games = getFromLocalStorage();

      return {
        ...state,
        games,
      };
    }
    
    case "CREATE_GAME": {
      const newGame = generateNewGame(state.games.length + 1);

      return {
        ...state,
        games: [...state.games, newGame],
      };
    }

    case "CREATE_ROUND": {
      const game = state.games.find((g) => g.id == action.id);
      if (!game) return state;

      const updatedRounds = updateRounds(game.rounds, game.players, action.data);

      const newTotals = game.totals.map((total) => {
        const { userId, value } = total;

        const newTotal = value + action.data[userId];

        return {
          userId,
          value: newTotal
        }
      })

      const updatedGame = {
          ...game,
          rounds: updatedRounds,
          totals: newTotals
        }

        
        
        return {
          ...state,
          games: state.games.map(game => {
            if (game.id == action.id ){
              return updatedGame;
            }

            return game;
          })
        };
    }

    case "DELETE_GAME": {
      const filteredGames = state.games.filter((game) => game.id !== Number(action.id));

      return {
        ...state,
        games: filteredGames
      }
    }

    default:
      return state;
  }
};