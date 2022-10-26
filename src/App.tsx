import "./App.css";
import { UsernameInput } from "./components/UsernameInput";
import { Game } from "./Game";
import { UnauthenticatedState, useAppStore } from "./store/store";

function App() {
  const authenticated = useAppStore((state) => state.authenticated);

  const auth = useAppStore((state) => (state as UnauthenticatedState).auth);
  return authenticated ? <Game /> : <UsernameInput onConfirm={auth} />;
}

export default App;
