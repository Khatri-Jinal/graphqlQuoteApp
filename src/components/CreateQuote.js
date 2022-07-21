import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqloperations/mutations";

function CreateQuote() {
  const [quote, setQuote] = useState("");
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
  });

  const handleSubmit = () => {
    createQuote({
      variables: {
        name: quote,
      },
    });
  };

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && <div className="green card-panel">{data.quote}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote"
        />
        <button className="btn green" type="submit" onClick={handleSubmit}>
          create
        </button>
      </form>
    </div>
  );
}

export default CreateQuote;
