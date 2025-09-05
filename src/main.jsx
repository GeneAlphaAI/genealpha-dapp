import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { AppKitProvider } from "./components/context/WalletConnect.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AppKitProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="bottom-right" reverseOrder={false} />
        <App />
      </BrowserRouter>
    </Provider>
  </AppKitProvider>
);
