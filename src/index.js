import React from "react";
import ReactDOM from "react-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import App from "./App";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Test Page</title>
      </Helmet>
    </HelmetProvider>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
