import App from "./App";
import { init } from "./hooks";

const render = () => {
  const root = document.getElementById("root");
  init(root, App);
};

window.addEventListener("DOMContentLoaded", () => render());
