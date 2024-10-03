import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import DeveloperFooter from "./components/DeveloperFooter";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckModal from "./components/CheckModal";
import BoundaryError from "./components/BoundaryError";

function App() {
  // const [count, setCount] = useState(0)

  const modalData = useSelector((state: RootState) => state.modalData);

  return (
    <div
      style={{
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
        <ErrorBoundary FallbackComponent={BoundaryError}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
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
        </ErrorBoundary>

        {modalData.visible && <CheckModal />}
        <DeveloperFooter />
      </Router>
    </div>
  );
}

export default App;
