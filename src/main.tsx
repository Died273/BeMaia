/* Restore deep link after GitHub Pages redirect */
(function () {
  try {
    var pending = sessionStorage.getItem('redirectPath');
    if (pending && typeof pending === 'string') {
      sessionStorage.removeItem('redirectPath');
      window.history.replaceState(null, '', pending);
    }
  } catch (_) {}
})();

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
