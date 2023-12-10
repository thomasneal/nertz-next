'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { GameProps } from '@/types';


export default function Home() {
  const router = useRouter();
  const [games, setGames] = useState<GameProps[]>([]);

  const newGameProps:GameProps =
    {
      id: games.length + 1,
      finished: false,
      rounds: [
        [
            { value: 10,
              userId: "1"
            },
            { value: 16,
              userId: "2"
            }
        ],
        [
          { value: -2,
            userId: "1"
          },
          { value: 14,
            userId: "2"
          }
        ],
      ], 
      players: [
        { id: 1, name: "Tom"},
        { id: 2, name: "Amanda"}
      ]
    };

  useEffect(() => {
    const stringToParse = localStorage.getItem("games");
    if (stringToParse) {
      const itemsArray = JSON.parse(stringToParse);
      setGames(itemsArray);
    }
    
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      localStorage.setItem("games", JSON.stringify(games));
    }
  }, [games]);

  const handleAddGame = () => {
    setGames([...games, newGameProps]);
    //router.push('/game');

  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-6xl uppercase mb-10">Nertz</h1>
      <h2 className="text-4xl uppercase mb-10">Games</h2>
      {games.map((game) => (
        <div key={game.id}>
          <Link href={`/game/${game.id}`}>Game {game.id}</Link>
        </div>
      ))}
      <button onClick={handleAddGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add a Game</button>
    </main>
  )
}
