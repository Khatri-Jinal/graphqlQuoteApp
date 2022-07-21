import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_QUOTES);
  useEffect(() => {
    refetch();
  }, [data]);

  if (loading) return <h1>Loading..</h1>;
  if (error) {
    console.log(error);
  }
  if (data.quotes.length === 0) {
    <h2>No quotes available</h2>;
  }
  return (
    <div className="container">
      {data &&
        data.quotes.map((quote, idx) => {
          return (
            <blockquote key={idx}>
              <h6>{quote.name}</h6>
              <Link to={`/profile/${quote.by.firstName}`}>
                <p className="right-align">~ {quote.by.firstName}</p>
              </Link>
            </blockquote>
          );
        })}
    </div>
  );
}

export default Home;
