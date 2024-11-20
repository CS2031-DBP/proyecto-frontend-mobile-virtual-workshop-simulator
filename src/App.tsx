import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuPrincipal from "./pages/MenuPrincipal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<MenuPrincipal />} />
      </Routes>
    </Router>
  );
}

export default App;
