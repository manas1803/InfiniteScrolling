import React from "react";

import "./AuthorQuotes.css"

export const AuthorQuotes = ({ authorQuotes, infiniteReference, hasReference }) => {
  return (
    <div key={authorQuotes.id} ref={hasReference ? infiniteReference : null} className="author-quote">
      <div>{authorQuotes.quote}</div>
      <p>~{authorQuotes.author}</p>
    </div>
  );
};
