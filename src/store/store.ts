import create from "zustand";
import { immer } from "zustand/middleware/immer";

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

// code from web
function shuffle<T extends any>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array as T[];
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkIfBingoed(board: (number | null)[], history: number[]) {
  const numberToIndex = Object.fromEntries(Object.entries(board).map((i, n) => [n, i]));
}

function calculateWinningStates(n: number) {
  const winningByRows = Array.from(Array(n).keys()).map((i) =>
    Array.from(Array(n).keys()).map((j) => j + n * i),
  );
  const winningByColumns = Array.from(Array(n).keys()).map((i) =>
    Array.from(Array(n).keys()).map((j) => j * n + i),
  );
  const diagonal = Array.from(Array(n).keys()).map((i) => i * (n + 1));
  return [...winningByRows, ...winningByColumns, diagonal];
}

export const useGameStore = create<Game>()(
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
        const shuffled = shuffle(candidates);
        board = [...board, ...shuffled.slice(0, 5)];
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

      const roll = number ?? randomIntFromInterval(1, get().rangeBasedOnSeed * get().seed.length);

      set((state) => {
        state.history.push(roll);
      });

      const hasGameFinished = get().winningStates.some((indices) =>
        indices.every((index) => get().board[index] === null || get().history.includes(get().board[index]!)),
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

export const useAppStore = create<AppState>()(
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
