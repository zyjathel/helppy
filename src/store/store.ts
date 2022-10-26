import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { shuffle, calculateWinningStates, randomIntFromInterval } from "./utils";

export interface Game {
  isGameOver: boolean;
  history: number[];
  // null is the *free* one
  board: (number | null)[];
  next(number?: number): void;
  shuffle(): void;
  seed: string;
  rangeBasedOnSeed: number;
  winningStates: number[][];
}

export type UnauthenticatedState = {
  authenticated: false;
  username: null;
  auth(name: string): void;
};

export type AuthenticatedAppState = {
  authenticated: true;
  username: string;
};
export type AppState = UnauthenticatedState | AuthenticatedAppState;
export const createUseGameStore = () =>
  create<Game>()(
    immer((set, get) => ({
      isGameOver: false,
      history: [],
      board: [],
      seed: "BINGO",
      shuffle: () => {
        let board: (number | null)[] = [];
        const seed = get().seed;
        const range = get().rangeBasedOnSeed;
        for (let i = 0; i < seed.length; i++) {
          const candidates = Array.from(Array(range).keys()).map((x) => x + 1 + range * i);
          const shuffledSlice = shuffle(candidates).slice(0, seed.length);
          // .sort((a, b) => a - b);

          board = [...board, ...shuffledSlice];
        }
        board[Math.floor(board.length / 2)] = null;
        set((state) => {
          state.board = board;
          state.history = [];
          state.winningStates = calculateWinningStates(get().seed.length);
          state.isGameOver = false;
        });
      },
      next: (number) => {
        if (get().isGameOver) {
          return;
        }

        let roll: number;

        if (number) {
          if (get().history.includes(number)) {
            return;
          } else {
            roll = number;
          }
        } else {
          roll = randomIntFromInterval(1, get().rangeBasedOnSeed * get().seed.length);
          while (get().history.includes(roll)) {
            roll = randomIntFromInterval(1, get().rangeBasedOnSeed * get().seed.length);
          }
        }

        set((state) => {
          state.history.push(roll);
        });

        const hasGameFinished = get().winningStates.some((indices) =>
          indices.every(
            (index) => get().board[index] === null || get().history.includes(get().board[index]!),
          ),
        );

        if (hasGameFinished) {
          set((state) => {
            state.isGameOver = true;
          });
        }
      },
      rangeBasedOnSeed: 15,
      winningStates: [],
    })),
  );

export const useGameStore = createUseGameStore();
export const createUseAppStore = () =>
  create<AppState>()(
    immer((set) => ({
      authenticated: false,
      username: null,
      auth: (name) => {
        set((state) => {
          state.authenticated = true;
          state.username = name;
        });
      },
    })),
  );

export const useAppStore = createUseAppStore();
