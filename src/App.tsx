import { FunctionComponent, useEffect } from "react";
import shallow from "zustand/shallow";
import "./App.css";
import { Board } from "./components/Board";
import { Cheat } from "./components/Cheat";
import { History } from "./components/History";
import { UsernameInput } from "./components/UsernameInput";
import { AuthenticatedAppState, UnauthenticatedState, useAppStore, useGameStore } from "./store/store";

const Game: FunctionComponent<{}> = () => {
  const username = useAppStore((state) => (state as AuthenticatedAppState).username);

  const seed = useGameStore((state) => state.seed);
  const board = useGameStore((state) => state.board);

  const isGameOver = useGameStore((state) => state.isGameOver);

  const history = useGameStore((state) => state.history);

  const next = useGameStore((state) => state.next, shallow);

  const restart = useGameStore((state) => state.shuffle, shallow);

  useEffect(restart, [restart]);

  return (
    <div className="bg-slate-50 flex h-screen w-screen flex-col">
      <div className="bg-slate-100 text-xl py-4 px-10">
        <h1>{username}'s Game</h1>
      </div>
      <div className="p-10">
        {isGameOver && (
          <p className="p-4 bg-purple-100 my-8 text-lg">The game took {history.length} turns.</p>
        )}
        <button className="bg-red-200 px-4 py-1 rounded-sm text-gray-800" onClick={restart}>
          Restart
        </button>
      </div>
      <div className="p-10">
        <Board data={board} heading={seed} marked={new Set(history)} />
      </div>
      <div className="p-10">
        <button
          className="bg-blue-200 px-4 py-1 rounded-sm text-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          onClick={() => next()}
          disabled={isGameOver}
        >
          Next
        </button>
      </div>
      <div className="p-10">
        <Cheat onConfirm={next} disabled={isGameOver} />
      </div>
      {history.length > 0 && (
        <div className="p-10">
          <History data={history} />
        </div>
      )}
    </div>
  );
};

function App() {
  const authenticated = useAppStore((state) => state.authenticated);

  const auth = useAppStore((state) => (state as UnauthenticatedState).auth);
  return authenticated ? <Game /> : <UsernameInput onConfirm={auth} />;
}

export default App;
