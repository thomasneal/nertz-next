'use client';
import { useReducer } from 'react';

type Player = { id: string; name: string };
type Round = { [id: string]: number };

type Game = {
  rounds: Round[];
  totals: { [id: string]: number };
};

const initialState: Game = {
  rounds: [],
  totals: {}
};

type AddRound = { type: 'ADD_ROUND'; round: Round };
type DeleteRound = { type: 'DELETE_ROUND'; deletedRoundIndex: number };
type EditRound = { type: 'EDIT_ROUND' };

type GameActions = AddRound | DeleteRound | EditRound;

export const gameReducer = (state: Game, action: GameActions): Game => {
  switch (action.type) {
    case 'ADD_ROUND': {
      return {
        ...state,
        rounds: [...state.rounds, action.round]
      };
    }

    case 'DELETE_ROUND': {
      return {
        ...state,
        rounds: state.rounds.filter((round, index) => index !== action.deletedRoundIndex)
      };
    }

    case 'EDIT_ROUND': {
      return state;
    }
  }
};

export default function DansPage() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleDeleteRound = (index: number) => {
    dispatch({ type: 'DELETE_ROUND', deletedRoundIndex: index });
  };

  const rounds = [{}, {}, {}];

  return (
    <div>
      <p>{JSON.stringify(state)}</p>
      {rounds.map((round, index) => {
        return (
          <button key={Math.random()} onClick={() => handleDeleteRound(index)}>
            DELETE
          </button>
        );
      })}
    </div>
  );
}

/**
 * Tael with users names on the columns
 * then rounds underneath names scored of that round
 *
 * Dan  Tom
 * 1     5
 * 2     7
 * 4     9
 *
 * game id - /game/[id]
 * round id? 1/2/3/4/5
 */

// const players: Player[] = [
//   { id: 'tom', name: 'Tom' },
//   { id: 'dan', name: 'Dan' }
// ];

// const round1: Round = { tom: 3, dan: 5 };
// const round2: Round = { tom: 6, dan: 8 };
// const round3: Round = { tom: 4, dan: 9 };
// const round4: Round = { tom: 10, dan: 5 };

// const game: Game = {
//   rounds: [round1, round2, round3, round4],
//   totals: {
//     tom: 13,
//     dan: 10
//   }
// };
