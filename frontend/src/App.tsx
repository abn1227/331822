// import ToggleThemeButton from "./components/ToggleThemeButton";
import { useTheme } from "./hooks/useTheme";
import LoginView from "./views/LoginView";

function App() {
  useTheme();
  return (
    <>
      <LoginView />
    </>
  );
}

export default App;
