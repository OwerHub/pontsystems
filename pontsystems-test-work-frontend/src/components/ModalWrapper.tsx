import DeleteModal from "./DeleteModal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// NOTE: While this approach may not be the most optimal in a real-world scenario,
// given the requirements of the task, it seemed like a logical solution.

function ModalWrapper() {
  const modalData = useSelector((state: RootState) => state.modalData);
  return <div>{modalData.type === "delete" && <DeleteModal />}</div>;
}

export default ModalWrapper;
