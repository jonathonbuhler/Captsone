import "./App.module.css";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Shop from "./components/Shop/Shop";
import LaptopView from "./components/Shop/LaptopView/LaptopView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="laptop/:id" element={<LaptopView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
