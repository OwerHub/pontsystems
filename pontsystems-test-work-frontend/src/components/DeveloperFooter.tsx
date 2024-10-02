import { useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

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

  return (
    <div
      style={{
        background: "rgba(0,0,0,0,.3)",
      }}
    >
      <h2>developerFooter</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
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
      <div>
        <div>test request: {requestTest}</div>
        <div>{tokenTest ? "token OK" : "not get token"}</div>
      </div>
    </div>
  );
}

export default DeveloperFooter;
