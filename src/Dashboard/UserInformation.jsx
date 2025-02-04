import { Button, Table } from "antd";
import { useGetAllUserLocationQuery } from "../app/fetchers/location/locationApi";
import { Link } from "react-router-dom";

function UserInformation() {
  const { data, isLoading } = useGetAllUserLocationQuery();

  const mainData = data?.data || [];

  // Prepare columns for the Ant Design Table
  const columns = [
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userName",
      render: (text, data) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
      render: (text) => text || "N/A",
    },
    {
      title: "Country",
      dataIndex: ["address", "country"],
      key: "country",
    },
    {
      title: "Full Information",
      dataIndex: "info",
      key: "action",
      render: (text, data) => (
        <Link to={`/dashboard/user-information/${data.user?._id}`}>
          <Button type="primary">Full Information</Button>
        </Link>
      ),
    },
  ];

  // Ensure only unique users are displayed
  const uniqueUsers = mainData.filter(
    (singleUserInfo, index, previousData) =>
      previousData.findIndex(
        (findingIndexForUser) =>
          findingIndexForUser.user?._id === singleUserInfo.user?._id
      ) === index
  );

  return (
    <div>
      <h1 className="text-gray-900 text-center text-2xl font-bold mb-5">
        User Information
      </h1>
      <Table
        dataSource={uniqueUsers}
        columns={columns}
        rowKey={(record) => record._id}
        bordered
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
}

export default UserInformation;
