import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // optional; we use Tailwind via CDN but keep file empty or small

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
