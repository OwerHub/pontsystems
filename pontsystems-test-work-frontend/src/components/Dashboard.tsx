import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//import { RootState, AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { Table, Space, Button } from "antd";
import deleteRowIcon from "../assets/delete-row.svg";
import editRowIcon from "../assets/edit-row.svg";
import viewRowIcon from "../assets/view-close-row.svg";

function Dashboard() {
  const citizens = useSelector((state: RootState) => state.citizenData.data);

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
      render: () => (
        <Space size="middle">
          <a>
            <img style={{ height: "1rem" }} src={viewRowIcon} alt="View" />
          </a>
          <a>
            <img style={{ height: "1rem" }} src={editRowIcon} alt="Edit" />
          </a>
          <a>
            <img style={{ height: "1rem" }} src={deleteRowIcon} alt="Delete" />
          </a>
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
    </div>
  );
}

export default Dashboard;
