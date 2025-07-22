import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { AppKitProvider } from "./components/context/WalletConnect.jsx";

createRoot(document.getElementById("root")).render(
  <AppKitProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppKitProvider>
);
