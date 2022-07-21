import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../gqloperations/queries";
import { useNavigate } from "react-router";

export default function Profile({ userData }) {
  const { loading, error, data, refetch } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    refetch();
  }, [data]);

  const navigate = useNavigate;
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  return (
    <div className="container">
      <div className="center-align">
        <img
          style={{ border: "2px solid black", marginTop: "10px" }}
          className="circle"
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt=""
        />
        <h5>
          {data.user.firstName} {data.user.lastname}
        </h5>
        <h5>Email-{data.user.email}</h5>
      </div>
      <h3>Your quotes</h3>
      {data.user.quotes.map((quote, idx) => {
        return (
          <blockquote key={idx}>
            <h6>{quote.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
