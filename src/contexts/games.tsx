'use client';

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer
} from "react";
import { GameProps } from "@/types";

type GamesContext = {
  games: GameProps[];
  setGames: React.Dispatch<React.SetStateAction<GameProps[]>>;
};

const defaultData: GamesContext = {
  games: [],
  setGames: () => null,
};



export const GamesContext = createContext<GamesContext>(defaultData);

interface Props {
  children: React.ReactNode;
}

function getFromLocalStorage() {
  const items = localStorage.getItem('games');
  return items ? JSON.parse(items) : [];
}


export const GamesProvider: React.FC<Props> = ({ children }) => {
  const [games, setGames] = useState<GameProps[]>(getFromLocalStorage);

  useEffect(() => {
    console.log("setting games");
    console.log({ games });
    localStorage.setItem('games', JSON.stringify(games))
  }, [games]);


  return (
    <GamesContext.Provider value={{ games, setGames }}>
      {children}
    </GamesContext.Provider>
  );
};