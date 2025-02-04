import { Button, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useVerifyMutation } from "../app/fetchers/auth/authApi";
import jwtDecodedUtils from "../utils/JwtDecode";
import { useDispatch } from "react-redux";
import { setUsers } from "../app/fetchers/auth/authSlice";

export default function VerifyOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  const [verify] = useVerifyMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!code || code.length !== 6 || !email) {
      toast.error("Invalid OTP");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        email,
        code,
      };
      const res = await verify(payload).unwrap();
      console.log(res);

      const user = jwtDecodedUtils(res?.data?.accessToken);
      dispatch(setUsers({ user: user, token: res?.data?.accessToken }));

      if (user?.role === "admin") {
        navigate("/dashboard/user-information");
      } else {
        navigate("/track-loaction");
      }
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">VerifyOtp</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex items-end justify-center">
            <Input.OTP
              length={6}
              autoFocus
              className="w-full"
              value={code}
              onChange={(value) => setCode(value)}
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Loading ..." : "Verify"}
            </Button>
          </div>
        </form>

        <div className="my-4 flex justify-center gap-1">
          Back to
          <Link to="/login" className="font-semibold hover:underline">
            Login
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
