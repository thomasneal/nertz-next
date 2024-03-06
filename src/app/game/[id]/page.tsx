'use client';
import { useEffect, useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GameProps, Total, Score } from "@/types";
import RoundTable from "@/components/roundTable";
import { updateRounds } from "@/utils";
import { GamesContext } from '@/contexts/games';
import { useRouter } from "next/navigation";
import Link from "next/link";

type Scores = { [userKey: string]: number };

export default function Game({ params }: { params: { id: number } }) {
  const { games, dispatch } = useContext(GamesContext);
  const game = games.find((g) => g.id == params.id);
  const [loading, setLoading] = useState(true);
  // console.log({ game });
 
  // const [game, setGame] = useState<GameProps>({ id: params.id, finished: false, rounds: [], players: []});
  const [totals, setTotals] = useState<Total[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
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


//  useEffect(() => {
//   // games = global context
//   if (games.length > 0) {
//     const found = games.find((g) => g.id == params.id);
//     // find the local
//     if (found) setGame(found);
//   }
// }, [games, params.id]);

  useEffect(() => {
    if (!loading && game) {
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
    }
  
  },[loading, game]);

  // useEffect(() => {
  //   if (game) {
  //     let itemsArray;
  //     const stringToParse = localStorage.getItem("games");
  //     if (stringToParse) {
  //       itemsArray = JSON.parse(stringToParse);
  //     }
  //     if (itemsArray) {
  //       const updatedGames = itemsArray.map((gameItem:GameProps) => (gameItem.id == params.id ? { ...gameItem, ...game } : gameItem ));
  //       console.log({ updatedGames });
  //       // localStorage.setItem("games", JSON.stringify(updatedGames));
  //     }
  //   }
  // }, [game, params.id]);


  // useEffect(() => {
  //   if (totals && game.finished === false) {
  //     const scoreHundred = totals.filter((total) => total.score >= 100);
  //     if (scoreHundred.length > 0) {
  //       setGame({ ...game, finished: true});
  //     }
  //   }
  // }, [totals, game]);

  const handleAddRound = (formData: any) => {
    dispatch({ type: "CREATE_ROUND", id: params.id, data: formData });
    // const updatedRounds = updateRounds(game.rounds, game.players, formData);

    // const updatedGame = {
    //   ...game,
    //   rounds: updatedRounds
    // }

    // setGame(updatedGame);
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
        <RoundTable rounds={game.rounds} players={game.players} totals={totals}></RoundTable>
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
                {...register(`${player.id}`, { required: true, valueAsNumber: true })}
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