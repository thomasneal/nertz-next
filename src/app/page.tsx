'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { GameProps } from '@/types';
import { GamesContext } from '@/contexts/games';

export default function Home() {
  const router = useRouter();
  const  { games, dispatch } = useContext(GamesContext);
  
  const handleAddGame = () => {
    dispatch({ type: 'CREATE_GAME'})
    // router.push('/game');
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
