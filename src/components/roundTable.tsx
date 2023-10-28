'use client';
import { Round, User, Total } from '@/types';

type Props = {
  rounds: Round[];
  players: User[];
  totals: Total[];
}

export default function RoundTable({ rounds, players, totals }: Props) {

  return (
    <table className="border-collapse table-auto w-full text-sm">
    <thead>
      <tr>
        <th className="border-b bg-white dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-600 text-left"></th>
        {players.map((player) => (
          <th className="border-b bg-white dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-600 text-left" key={player.id}>{player.name}</th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-slate-800">
      {rounds.map((round) => (
          <tr key={round.id}>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Round {round.id}</td>
            {round.scores.map((score) => (
              <td key={score.user.id} className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{score.value}</td>
            ))}
          </tr>
        ))}
        <tr>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Total</td>
            {totals.map((total) => (
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400" key={`total-${total.name}`}>{total.score}</td>
            ))}
        </tr>
    </tbody>
  </table>
  );
}