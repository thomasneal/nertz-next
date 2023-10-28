'use client';
import { useEffect, useState } from "react";
import { GameProps, Total } from "@/types";
import RoundTable from "@/components/roundTable";

export default function Game({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<GameProps>({ id: parseInt(params.id), finished: false, rounds: [], players: []});
  const [totals, setTotals] = useState<Total[]>([]);

 useEffect(() => {
 
  let itemsArray;
  const stringToParse = localStorage.getItem("games");
  if (stringToParse) {
    itemsArray = JSON.parse(stringToParse);
  }
  if (itemsArray) {
    const found = itemsArray.find((item:string) => item = params.id);
    setGame(found);
  }
}, [params.id]);

useEffect(() => {
const getTotals: Total[] = game.rounds.reduce((acc, round) => {
  const roundScore: { [key: string]: number } = {};

  round.scores.forEach((score) => {
    roundScore[score.user.name] = score.value;
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
}, []);

setTotals(getTotals);
},[game.rounds]);

  

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h2 className="text-4xl uppercase mb-10">Game {params.id}</h2>
      <h3 className="text-3xl uppercase mb-2">Players</h3>
      <ul className="mb-10">
        {game.players && game.players.map((player) => (
          <li key={player.name}>{player.name}</li>
        ))}
      </ul>
      <h3 className="text-3xl uppercase mb-2">Rounds</h3>
      <RoundTable rounds={game.rounds} players={game.players} totals={totals}></RoundTable>
    </main>
  )
}