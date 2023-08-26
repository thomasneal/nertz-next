'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleAddGame = () => {
    router.push('/game');
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-6xl uppercase mb-10">Nertz</h1>
      <button onClick={handleAddGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add a Game</button>
    </main>
  )
}
