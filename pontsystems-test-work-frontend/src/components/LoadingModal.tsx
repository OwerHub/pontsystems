import { Modal } from "antd";
import LoadingIndicator from "./LoadingIndicator";

const LoadingModal = () => {
  return (
    <Modal open={true} footer={null} closable={false} centered>
      <LoadingIndicator iconSize={56} />
    </Modal>
  );
};

export default LoadingModal;
