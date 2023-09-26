'use client';
import { useEffect, useState } from "react";
import { GameProps } from "@/types";

export default function Game({ params }: { params: { id: string } }) {
  // console.log({ params })
  const [game, setGame] = useState<GameProps>({ id: parseInt(params.id), finished: false, rounds: [], players: []});
  // pull the id from the params
  // make an api call to the db
  // hceckk if is valid
  // setIsChecking(false)
  // if yesm, fetch that, render 
  // if no, redirect

  // const [isChecking, setIsChecking] = useState()


 // if (isChecking) return null;

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

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h2 className="text-4xl uppercase mb-10">Game {params.id}</h2>
      <h3>Players</h3>
      <ul>
        {game.players && game.players.map((player) => (
          <li key={player.name}>{player.name}</li>
        ))}
      </ul>
    </main>
  )
}