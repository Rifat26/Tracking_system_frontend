import React from "react";
import { Button, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../app/fetchers/auth/authSlice";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "02",
    label: <Link to="user-information">User Information</Link>,
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const logoutHandeler = () => {
    dispatch(logout());
  };
  return (
    <Layout className="h-screen">
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        >
          <div className="text-white flex items-center justify-between px-4">
            <Link to="/dashboard/user-information">
              <h2 className="font-bold">Dashboard</h2>
            </Link>
            <Button onClick={logoutHandeler} danger>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
