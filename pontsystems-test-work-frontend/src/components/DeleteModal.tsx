import React from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeCitizen } from "../store/citizenDataSlice";
import { closeModal } from "../store/modalSlice";

function DeleteModal() {
  const modalData = useSelector((state: RootState) => state.modalData);
  const dispatch = useDispatch();

  const citizen = modalData.citizen;

  // TODO: Add error handling
  const handleDelete = () => {
    if (citizen) {
      dispatch(removeCitizen(citizen.id));
      dispatch(closeModal());
    } else {
      console.error("No citizen data to delete");
      dispatch(closeModal());
    }
  };

  return (
    <div>
      <Modal
        title="Confirm Delete Citizen"
        open={true}
        onOk={() => handleDelete()}
        onCancel={() => dispatch(closeModal())}
      >
        <div>Are you sure you want to delete citizen ?</div>
        <div>
          {citizen?.firstName} {citizen?.lastName}, {citizen?.taxIdentifier}
        </div>
      </Modal>
    </div>
  );
}

export default DeleteModal;
