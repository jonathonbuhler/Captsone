import "./App.module.css";
import Admin from "./components/Admin/Admin";
import Shop from "./components/Shop/Shop";
import LaptopView from "./components/Shop/LaptopView/LaptopView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="laptop/:id" element={<LaptopView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
