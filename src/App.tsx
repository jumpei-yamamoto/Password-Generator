import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import typescriptLogo from "./assets/typescript-icon.svg";
import tailwindLogo from "./assets/tailwind-css.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Popup from "./Popup";
import FormComp from "./components/Form";

function App() {
  return (
    <>
      <div className="logo-container">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo mr-5" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img
            src={typescriptLogo}
            className="logo ml-5 typescript"
            alt="TypeScript logo"
          />
        </a>
        <a href="https://tailwindcss.com/" target="_blank">
          <img
            src={tailwindLogo}
            className="logo ml-5 tailwind"
            alt="Tailwind logo"
          />
        </a>
      </div>
      <p>Password Generator with React</p>

      <Router>
        <div>
          <nav>
            {/* リンクを設定 */}
            <Link to="/popup">Open Popup</Link>
          </nav>
          {/* ルートを設定 */}
          <Routes>
            <Route path="/popup" element={<Popup />}></Route>
            <Route path="/form" element={<FormComp />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
