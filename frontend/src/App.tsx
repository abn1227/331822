// import ToggleThemeButton from "./components/ToggleThemeButton";
import { useTheme } from "./hooks/useTheme";
import RouterCustom from "./routes/router";

function App() {
  useTheme();
  return (
    <>
      <RouterCustom />
    </>
  );
}

export default App;
