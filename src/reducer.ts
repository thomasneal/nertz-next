'use client';

import { GameProps } from "./types";

type State = {
  newGame: GameProps,
  games: GameProps[]
}

type CreateAction = {
  type: "CREATE_GAME"
};

type HydrateAction = {
  type: "HYDRATE_GAMES",
  games: GameProps[];
};

type Actions = 
  CreateAction
  | HydrateAction;

export default function GameReducer(state: State, action: Actions) {
  switch (action.type) {
    case "CREATE_GAME":
      return {
        ...state,
        games: [...state.games, state.newGame],
      };

    // case "EDIT_EMPLOYEE":
    //   const updatedEmployee = action.payload;

    //   const updatedEmployees = state.employees.map((employee) => {
    //     if (employee.id === updatedEmployee.id) {
    //       return updatedEmployee;
    //     }
    //     return employee;
    //   });

    //   return {
    //     ...state,
    //     employees: updatedEmployees,
    //   };

    // case "REMOVE_EMPLOYEE":
    //   return {
    //     ...state,
    //     employees: state.employees.filter(
    //       (employee) => employee.id !== action.payload
    //     ),
    //   };

    default:
      return state;
  }
};