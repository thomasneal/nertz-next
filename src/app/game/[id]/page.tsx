'use client';
import { useEffect, useState } from "react";
import { GameProps, Total } from "@/types";
import RoundTable from "@/components/roundTable";
import { updateRounds } from "@/utils";

export default function Game({ params }: { params: { id: number } }) {
  const [game, setGame] = useState<GameProps>({ id: params.id, finished: false, rounds: [], players: []});
  const [totals, setTotals] = useState<Total[]>([]);

 useEffect(() => {
  let itemsArray;
  const stringToParse = localStorage.getItem("games");
  if (stringToParse) {
    itemsArray = JSON.parse(stringToParse);
  }
  if (itemsArray) {
    const found = itemsArray.find((item:number) => item = params.id);
    setGame(found);
  }
}, [params.id]);

  useEffect(() => {
  const getTotals: Total[] = game.rounds.reduce((acc, round) => {
    const roundScore: { [key: string]: number } = {};
    round.forEach((score) => {
      roundScore[score.userId] = score.value;
    });

    const formatted = Object.entries(roundScore).map(([name, score]) => {
      return {
        name,
        score,
      };
    });

    if (acc.length === 0) {
      return formatted;
    }

    const updated = acc.map((x) => {
      const existingScore = formatted.find((y) => y['name'] === x['name']);

      if (existingScore) {
        return {
          name: x['name'],
          score: x['score'] + existingScore.score,
        };
      } else {
        return x;
      }
    });

    return updated;
  }, [] as Total[]);

  setTotals(getTotals);
  },[game]);

  useEffect(() => {
    if (game) {
      let itemsArray;
      const stringToParse = localStorage.getItem("games");
      if (stringToParse) {
        itemsArray = JSON.parse(stringToParse);
      }
      if (itemsArray) {
        const updatedGames = itemsArray.map((gameItem:GameProps) => (gameItem.id == params.id ? { ...gameItem, ...game } : gameItem ));
        localStorage.setItem("games", JSON.stringify(updatedGames));
      }
    }
  }, [game, params.id]);

  useEffect(() => {
    if (totals && game.finished === false) {
      const scoreHundred = totals.filter((total) => total.score >= 100);
      if (scoreHundred.length > 0) {
        setGame({ ...game, finished: true});
      }
    }
  }, [totals, game]);

  const handleAddRound = (formData: FormData) => {
    const updatedRounds = updateRounds(game.rounds, game.players, formData);

    const updatedGame = {
      ...game,
      rounds: updatedRounds
    }

    setGame(updatedGame);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h2 className="text-4xl uppercase mb-10">Game {params.id}</h2>
      <h3 className="text-3xl uppercase mb-2">Rounds</h3>
      <RoundTable rounds={game.rounds} players={game.players} totals={totals}></RoundTable>
      {!(game.finished) && (
         <form className="mt-12" action={handleAddRound}>
         {game.players.map((player) => (
            <div className="mb-4" key={player.id}>
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={player.id.toString()}>
             {player.name}
               <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={`player-${player.id}`} id={player.id.toString()} type="text" />
             </label>  
           </div>
           ))}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white mt-4 font-bold py-2 px-4 rounded">Add New Round +</button>
         </form>
      )}
     
    </main>
  )
} 