import { Button } from "antd";
import React from "react";

interface DeleteModalProps {
  id: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteModal(props: DeleteModalProps) {
  const { id, setModalVisible } = props;

  return (
    <div>
      <h1>DeleteModal</h1>
      <div>Are you sure delete ${id}</div>
      <div>
        <Button type="primary" onClick={() => setModalVisible(false)}>
          Yes
        </Button>
        <Button>Close</Button>
      </div>
    </div>
  );
}

export default DeleteModal;
