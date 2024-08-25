import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
async function enableMocking() {
  // 일반적인 경우
  // if (process.env.NODE_ENV !== 'development') {

  // vite의 경우
  // if (!import.meta.env.DEV) {
  //   return;
  // }

  const { worker } = await import("./mocks/browser.ts");

  // 서비스 워커 시작
  return worker.start();
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
reportWebVitals();
