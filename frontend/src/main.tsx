import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import ToastProvider from "./providers/ToastProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import ToastContainer from "./components/Toast/index.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <I18nextProvider i18n={i18n}>
                <App />
                <ToastContainer />
              </I18nextProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </StrictMode>
    </PersistGate>
  </Provider>
);
