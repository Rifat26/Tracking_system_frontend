import React, { useState } from "react";
import { useGetSingleUserLocationQuery } from "../app/fetchers/location/locationApi";
import { Link, useParams } from "react-router-dom";
import { Button, Table } from "antd";

function UserFullInformation() {
  const params = useParams();
  const id = params.id;
  const { data } = useGetSingleUserLocationQuery(id);
  const [currentmap, setCurrentMap] = useState(null);
  const mainData = data?.data;
  console.log(mainData);
  const columns = [
    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "userName",
      responsive: ["xs", "sm"], // This will hide it on smaller screens
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "userEmail",
      responsive: ["xs", "sm"],
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
      responsive: ["xs", "sm"],
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
      responsive: ["xs", "sm"],
    },
    {
      title: "Country",
      dataIndex: ["address", "country"],
      key: "country",
      responsive: ["xs", "sm"],
    },
    {
      title: "State",
      dataIndex: ["address", "state"],
      key: "state",
      responsive: ["xs", "sm"],
    },
    {
      title: "District",
      dataIndex: ["address", "state_district"],
      key: "district",
      responsive: ["xs", "sm"],
    },
    {
      title: "Created Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleTimeString(),
      responsive: ["xs", "sm"],
    },
    {
      title: "View In Map",
      dataIndex: "map",
      key: "map",
      render: (item, data) => (
        <>
          <Link to={`/dashboard/view-map/${data?._id}`}>
            <Button type="primary">View In Map</Button>
          </Link>
          {/* <Link
            to={`https://maps.google.com/?q=${data?.latitude},${data?.longitude}`}
            target="_blank"
          >
            <Button type="primary">View In Google Map</Button>
          </Link> */}
        </>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={mainData}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="responsive-table"
      />
    </div>
  );
}

export default UserFullInformation;
