import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { closeModal } from "../store/modalSlice";
// import { clickOK } from "../store/modalSlice";
import { useMockAxios } from "../hooks/useMockAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckModal() {
  const modalData = useSelector((state: RootState) => state.modalData);
  const dispatch = useDispatch();
  const { fetchData } = useMockAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  // TODO: find a better case, what can control from modal
  const deleteCitizen = async (citizenId: string | undefined) => {
    setLoading(true);
    const response = await fetchData("/deleteCitizen", "delete", citizenId);
    if (response?.status === 200) {
      dispatch(closeModal());
    } else {
      setLoading(false);
      setError("Error deleting citizen");
      setTimeout(() => {
        dispatch(closeModal());
      }, 5000);
    }
  };

  const formCheckOut = async () => {
    navigate("/dashboard");
    dispatch(closeModal());
  };

  const onOkHandler = async () => {
    if (modalData.modalIdentifier === "deleteCheck") {
      await deleteCitizen(modalData.payLoad?.citizenId);
    }
    if (modalData.modalIdentifier === "formQuitCheck") {
      await formCheckOut();
    }
  };

  return (
    <div>
      <Modal
        title={modalData.title}
        open={true}
        onOk={() => onOkHandler()}
        onCancel={() => dispatch(closeModal())}
      >
        {loading && <div>Loading...</div>}
        {!loading && !error && <div>{modalData.message}</div>}
        <div style={{ color: "red" }}>{error}</div>
      </Modal>
    </div>
  );
}

export default CheckModal;
