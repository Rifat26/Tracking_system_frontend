import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/fetchers/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="bg-blue-950">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="font-bold mr-4 text-2xl py-4 text-white">
              Location Tracker
            </div>
            {/* <div className="flex gap-4">
              {user?.role === "admin" ? (
                <Link to="/dashboard" className="text-white font-bold">
                  Dashboard
                </Link>
              ) : (
                <Link to="/" className="text-white font-bold">
                  Track Location
                </Link>
              )}
            </div> */}
          </div>
          <div>
            {user ? (
              <Link
                onClick={handleLogout}
                className="text-white font-bold"
                to="/"
              >
                Logout
              </Link>
            ) : (
              <Link className="text-white font-bold" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
