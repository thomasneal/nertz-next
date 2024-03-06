'use client';

import { GameProps } from "./types";
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
  data: any,
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
    ]
  });

  export function getFromLocalStorage() {
    const items = localStorage.getItem('games');
    return items ? JSON.parse(items) : [];
  }

export default function GameReducer(state: State, action: Actions) {
  switch (action.type) {
    case "HYDRATE_GAMES": {
      const games = getFromLocalStorage();
      console.log({ games });

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
      console.log('CREATE_ROUND');
      let updatedGame;
      const game = state.games.find((g) => g.id == action.id);
      if (game) {
        const updatedRounds = updateRounds(game.rounds, game.players, action.data);
        updatedGame = {
          ...game,
          rounds: updatedRounds
        }
        
        state.games.splice((action.id - 1), 1, updatedGame);
      
        return {
          ...state,
         games: [...state.games]
        }
      }

      return {
        ...state,
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