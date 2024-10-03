import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Table, Space, Button } from "antd";
import { deleteIcon, editIcon, viewIcon } from "../assets";
import { openModal } from "../store/modalSlice";
import { ICitizenRegistrationData } from "../types";
import { useNavigate } from "react-router-dom";
import { fetchCitizens } from "../store/citizenDataSlice";
import { useEffect } from "react";
import LoadingModal from "./LoadingModal";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import dashbardFixColumns from "../appData/dashboardFixColum.json";

function Dashboard() {
  const {
    data: citizens,
    isLoading,
    firstLoading,
  } = useSelector((state: RootState) => state.citizenData);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // NOTE: maybe the fixed colums should be extracted to a constant and imported from a shared file
  const handleDeleteButton = (citizen: ICitizenRegistrationData) => {
    const citizenName =
      citizen.firstName && citizen.lastName
        ? `${citizen.firstName} ${citizen.lastName}`
        : "this citizen";

    const citizenId = citizen.id.toString();

    dispatch(
      openModal({
        modalIdentifier: "deleteCheck",
        type: "dirtyCheck",
        title: "Delete Citizen",
        message: `Are you sure you want to delete ${citizenName} ?`,
        payLoad: { citizenId: citizenId },
      })
    );
  };

  const handleEditButton = (citizen: ICitizenRegistrationData) => {
    navigate(`/edit/${citizen.id}`);
  };

  const handleViewButton = (citizen: ICitizenRegistrationData) => {
    navigate(`/view/${citizen.id}`);
  };

  useEffect(() => {
    if (firstLoading) {
      dispatch(fetchCitizens());
    }
  }, [dispatch]);

  // TODO: extract fix columns to a separate file
  const columns = [
    ...dashbardFixColumns,
    {
      title: "Credit Eligible",
      dataIndex: "creditEligible",
      key: "creditEligible",
      render: (text: boolean) => (text ? <CheckOutlined /> : <CloseOutlined />),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: ICitizenRegistrationData) => (
        <Space size="middle">
          <div
            onClick={() => handleViewButton(record)}
            style={{ height: "1rem", width: "1rem", cursor: "pointer" }}
          >
            <img style={{ height: "1rem" }} src={viewIcon} alt="View" />
          </div>
          <div
            onClick={() => handleEditButton(record)}
            style={{ height: "1rem", width: "1rem", cursor: "pointer" }}
          >
            <img style={{ height: "1rem" }} src={editIcon} alt="Edit" />
          </div>
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

  if (isLoading) {
    return <LoadingModal />;
  }

  console.log(citizens);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Dashboard</h1>

      <Button
        type="primary"
        style={{ marginBottom: "1rem", width: "5rem" }}
        onClick={() => navigate("/register")}
      >
        Add Citizen
      </Button>
      {citizens?.length > 0 ? (
        <Table columns={columns} dataSource={citizens} rowKey="id" />
      ) : (
        <p>No citizens found</p>
      )}
    </div>
  );
}

export default Dashboard;
