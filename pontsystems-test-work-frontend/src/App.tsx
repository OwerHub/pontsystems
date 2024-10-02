import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import DeveloperFooter from "./components/DeveloperFooter";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div
      style={{
        background: "rgba(0, 0, 200, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register type="register" />} />
          <Route path="/edit/:id" element={<Register type="edit" />} />
          <Route path="/view/:id" element={<Register type="view" />} />
        </Routes>
        <DeveloperFooter />
      </Router>
    </div>
  );
}

export default App;
