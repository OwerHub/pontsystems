import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
//import { RootState, AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { Table, Space, Button } from "antd";
import { deleteIcon, editIcon, viewIcon } from "../assets";
// import { CitizenRegistrationData } from "../store/citizenDataSlice";
import { openModal } from "../store/modalSlice";
import ModalWrapper from "../components/ModalWrapper";
import { ICitizenRegistrationData } from "../types";
function Dashboard() {
  const citizens = useSelector((state: RootState) => state.citizenData.data);
  const modalData = useSelector((state: RootState) => state.modalData);
  const dispatch = useDispatch();
  // NOTE: maybe the fixed colums should be extracted to a constant and imported from a shared file

  const handleDeleteButton = (citizen: ICitizenRegistrationData) => {
    dispatch(openModal({ type: "delete", citizen: citizen }));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      key: "middleName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Maiden Name",
      dataIndex: "maidenName",
      key: "maidenName",
    },
    {
      title: "Place of Birth",
      dataIndex: "placeOfBirth",
      key: "placeOfBirth",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Tax Identifier",
      dataIndex: "taxIdentifier",
      key: "taxIdentifier",
    },
    {
      title: "Credit Eligible",
      dataIndex: "creditEligible",
      key: "creditEligible",
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: ICitizenRegistrationData) => (
        <Space size="middle">
          <a>
            <img style={{ height: "1rem" }} src={viewIcon} alt="View" />
          </a>
          <a>
            <img style={{ height: "1rem" }} src={editIcon} alt="Edit" />
          </a>
          <div
            style={{ height: "1rem", width: "1rem", cursor: "pointer" }}
            onClick={() => handleDeleteButton(record)}
          >
            <img style={{ height: "1rem" }} src={deleteIcon} alt="Delete" />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Dashboard</h1>

      <Button type="primary" style={{ marginLeft: "auto" }}>
        Add Citizen
      </Button>
      {citizens.length > 0 ? (
        <Table columns={columns} dataSource={citizens} rowKey="id" />
      ) : (
        <p>No citizens found</p>
      )}
      {modalData.visible && modalData.type === "delete" && <ModalWrapper />}
    </div>
  );
}

export default Dashboard;
