import React from "react";

export const AuthorQuotes = ({ authorQuotes, infiniteReference, hasReference }) => {
  return (
    <div key={authorQuotes.id} ref={hasReference ? infiniteReference : null}>
      <div>{authorQuotes.quote}</div>
      <p>{authorQuotes.author}</p>
    </div>
  );
};
