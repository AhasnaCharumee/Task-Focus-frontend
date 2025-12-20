import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/global.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
// FullCalendar styles
// Note: removed '@fullcalendar/common/main.css' due to resolver issues in some setups.
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
