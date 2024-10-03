import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import "../styles/DeveloperFooter.css";

function DeveloperFooter() {
  const [requestTest, setRequestTest] = useState<string>("");
  const [tokenTest, setTokenTest] = useState<boolean>(false);
  const [authenticateTest, setAuthenticateTest] = useState<boolean>(false);
  const { fetch, loading, error } = useAxios();
  const { logout, isAuthenticated } = useAuth();

  const testRequestHandler = async () => {
    const response = await fetch("/test", "GET");
    setRequestTest(response.data.message);
    if (response.data.token?.length > 5) {
      setTokenTest(true);
    } else {
      setTokenTest(false);
    }
  };

  const checkAuthentication = () => {
    setAuthenticateTest(isAuthenticated());
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="developerFooterContainer">
      <div className="buttonContainer">
        <button onClick={() => logout()}>logout</button>
        <button onClick={() => testRequestHandler()}>
          {loading ? "Loading..." : "Test Request"}
        </button>
        <button
          onClick={() => checkAuthentication()}
          style={{ background: `${authenticateTest ? "green" : "red"}` }}
        >
          CheckAutentication
        </button>
      </div>
      <div className="testDisplayContainer">
        <div className="testDisplay">test request: {requestTest}</div>
        <div className="testDisplay">
          {tokenTest ? "I recived" : "i didn't recived"} token
        </div>
      </div>
    </div>
  );
}

export default DeveloperFooter;
