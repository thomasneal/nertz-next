'use client';

import {
  createContext,
  Dispatch,
  useEffect,
  useReducer
} from "react";
import GameReducer, { Actions } from "@/reducer";
import { GameProps } from "@/types";

type GamesContext = {
  games: GameProps[];
  dispatch: Dispatch<Actions>;
};

const defaultData: GamesContext = {
  games: [],
  dispatch: () => null
};

export const GamesContext = createContext<GamesContext>(defaultData);

interface Props {
  children: React.ReactNode;
}


export const GamesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, { games: []});

  useEffect(() => {
      dispatch({ type: 'HYDRATE_GAMES' })
  }, []);

  // update localstorage when games update
  useEffect(() => {
    if (state.games.length > 0) {
      localStorage.setItem('games', JSON.stringify(state.games))
    }
  }, [state.games]);


  return (
    <GamesContext.Provider value={{ games: state.games, dispatch }}>
      {children}
    </GamesContext.Provider>
  );
};