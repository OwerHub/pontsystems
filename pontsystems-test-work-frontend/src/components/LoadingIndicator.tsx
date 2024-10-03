import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingIndicator = (props: { iconSize?: number }) => {
  const { iconSize = 48 } = props;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: iconSize }} spin />}
        size="large"
      />
    </div>
  );
};

export default LoadingIndicator;
