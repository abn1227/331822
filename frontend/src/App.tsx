// import ToggleThemeButton from "./components/ToggleThemeButton";
import { useTheme } from "./hooks/useTheme";
import RouterCutom from "./routes/router";

function App() {
  useTheme();
  return (
    <>
      <RouterCutom />
    </>
  );
}

export default App;
