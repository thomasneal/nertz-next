'use client';
import { useEffect, useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Scores } from "@/types";
import RoundTable from "@/components/roundTable";
import { GamesContext } from '@/contexts/games';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Game({ params }: { params: { id: number } }) {
  const { games, dispatch } = useContext(GamesContext);
  const game = games.find((g) => g.id == params.id);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Scores>();

  const onSubmit: SubmitHandler<Scores> = (data) => {
    handleAddRound(data);
  }

  useEffect(() => {
    if (game) {
      setLoading(false);
    }
  }, [game]);

  const handleAddRound = (formData: Scores) => {
    dispatch({ type: "CREATE_ROUND", id: params.id, data: formData });
  }

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: "DELETE_GAME", id: params.id });
    router.push('/');
  }

   if (loading || !game) {
    return <p>Loading...</p>; 
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Link className="self-start" href={`/`}>&lt; Back to Games</Link>
      <h2 className="text-4xl uppercase mb-10">Game {params.id}</h2>
      <button className="bg-red-500 hover:bg-red-700 text-white mt-4 font-bold py-2 px-4 rounded self-end" onClick={ handleDelete }>Delete Game</button>
      
      <h3 className="text-3xl uppercase mb-2">Rounds</h3>
      {game.rounds && (
        <RoundTable rounds={game.rounds} players={game.players} totals={game.totals}></RoundTable>
      )}
      {!(game.finished) && (
         <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
         {game.players.map((player) => (
            <div className="mb-4" key={player.id}>
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={player.id.toString()}>
             {player.name}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                required
                id={player.id.toString()} 
                // TODO: fix typing
                {...register(`${player.id}` as never, { required: true, valueAsNumber: true })}
                aria-invalid={errors[player.id] ? "true" : "false"}
              />
             </label>  
           </div>
           ))}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white mt-4 font-bold py-2 px-4 rounded">Add New Round +</button>
         </form>
      )}
     
    </main>
  )
} 