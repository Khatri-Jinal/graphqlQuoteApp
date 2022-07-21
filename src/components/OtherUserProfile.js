import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../gqloperations/queries";
import { useParams } from "react-router";

export default function OtherUserProfile() {
  const { userid } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: {
      userid,
    },
  });
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
      {data.user.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
