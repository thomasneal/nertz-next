'use client';
import { useState } from 'react';
import Link from 'next/link';

type GameProps = {
  id: number,
  //rounds: Array,
}

const initialGames:GameProps[] = [
  {id: 1},
  {id: 2},
  {id: 3}
];

export default function Games() {
  const [games, setGames] = useState(initialGames);

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h2 className="text-4xl uppercase mb-10">Games</h2>
      {games.map((game) => (
        <div key={game.id}>
          <Link href={`/game/${game.id}`}>Game {game.id}</Link>
        </div>
      ))}
      <div>

      </div>
    </main>
  )
}
