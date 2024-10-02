import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import DeveloperFooter from "./components/DeveloperFooter";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register type="register" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <Register type="edit" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view/:id"
            element={
              <ProtectedRoute>
                <Register type="view" />
              </ProtectedRoute>
            }
          />
        </Routes>
        <DeveloperFooter />
      </Router>
    </div>
  );
}

export default App;
