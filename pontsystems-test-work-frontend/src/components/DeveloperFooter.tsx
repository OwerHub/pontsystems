import { useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

function DeveloperFooter() {
  const [requestTest, setRequestTest] = useState<string>("");
  const [tokenTest, setTokenTest] = useState<boolean>(false);
  const { fetch, loading, error } = useAxios();
  const { logout } = useAuth();
  const testRequestHandler = async () => {
    const response = await fetch("/test", "GET");
    console.log("testRequestHandler", response);
    setRequestTest(response.data.message);
    if (response.data.token?.length > 5) {
      setTokenTest(true);
    } else {
      setTokenTest(false);
    }
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
      </div>
      <div>
        <div>test request: {requestTest}</div>
        <div>{tokenTest ? "token OK" : "not get token"}</div>
      </div>
    </div>
  );
}

export default DeveloperFooter;
