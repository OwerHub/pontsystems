import React from "react";

function BoundaryError() {
  return (
    <div
      style={{
        width: "80vw",
        margin: "0 auto",
        height: "40vh",
        background: "rgba(255, 255, 258, 0.4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      <h1>Something Wrong here.... </h1>
      <h3>We are very, very sorry</h3>
    </div>
  );
}

export default BoundaryError;
