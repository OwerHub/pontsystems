import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
function Header() {
  const navigate = useNavigate();
  return (
    <div className="headerContainer" style={{}}>
      <div className="buttonContainer">
        <button onClick={() => navigate("/dashboard")}>dashboard</button>
        <button onClick={() => navigate("/register")}>New</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
}

export default Header;
