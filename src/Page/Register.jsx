import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useRegisterMutation } from "../app/fetchers/auth/authApi";
import { toast, Toaster } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, { isLoading, error }] = useRegisterMutation();
  const [formError, setFormError] = useState("");
  const navigation = useNavigate();
  const onFinish = async (values) => {
    const { name, email, password, confirmPassword } = values;
    const information = { name: name, email: email, password: password };
    console.log(information);
    try {
      const res = await registerData(information).unwrap();
      if (res.success) {
        toast.success(res.message);
        navigation("/login");
      }
      setFormError("");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {formError && (
          <div className="text-red-500 text-center mb-4">{formError}</div>
        )}

        <Form
          layout="vertical"
          name="register"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="w-full" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password className="w-full" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="my-4">
          If you have already account please{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Login
          </Link>{" "}
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default Register;
