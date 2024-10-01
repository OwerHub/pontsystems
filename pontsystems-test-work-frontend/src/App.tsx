import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register type="register" />} />
          <Route path="/edit/:id" element={<Register type="edit" />} />
          <Route path="/view/:id" element={<Register type="view" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
