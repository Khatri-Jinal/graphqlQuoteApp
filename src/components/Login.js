import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { LOGIN_USER } from "../gqloperations/mutations";
import { GET_MY_PROFILE } from "../gqloperations/queries";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [signinUser, { loading, data, error, reset }] = useMutation(
    LOGIN_USER,
    {
      refetchQueries: [GET_MY_PROFILE],
      onCompleted(data) {
        localStorage.setItem("token", data.user.token);
        navigate("/");
      },
    }
  );
  useEffect(() => {
    reset();
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
    setFormData({ email: "", password: "" });
  };
  if (loading) return <h1>Loading</h1>;
  // if (data) {
  //   localStorage.setItem("token", data.user.token);
  //   navigate("/");
  // }
  return (
    <>
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.signupUser && (
        <div className="green card-panel">
          {data.user.token} login successfully
        </div>
      )}
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
          />
          <Link to="/login">
            <p>Don't have an account ?</p>
          </Link>
          <button type="submit" className="green btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
