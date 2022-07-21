import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gqloperations/mutations";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew: formData,
      },
    });
    setFormData({
      firstName: "",
      lastname: "",
      email: "",
      password: "",
    });
  };
  if (loading) return <h1>Loading</h1>;
  return (
    <>
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.signupUser && (
        <div className="green card-panel">
          {data.signupUser.firstName} signedup successfully
        </div>
      )}
      <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="firstName"
          />{" "}
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="lastname"
          />
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
            <p>Already have an account ?</p>
          </Link>
          <button type="submit">Signup</button>
        </form>
      </div>
    </>
  );
}
