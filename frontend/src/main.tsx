import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import Cart from "./components/client/Cart.tsx";
import { ToastContainer } from "react-toastify";
import MapPicker from "./components/client/MapPicker.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
      <ToastContainer />
      <Cart />
      <MapPicker />
    </Provider>
  </StrictMode>
);
