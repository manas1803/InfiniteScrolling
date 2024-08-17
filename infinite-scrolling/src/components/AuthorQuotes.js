import React from "react";

export const AuthorQuotes = ({ authorQuotes, infiniteReference, hasReference }) => {
  return (
    <div key={authorQuotes.id} ref={hasReference ? infiniteReference : null}>
      <blockquote>{authorQuotes.quote}</blockquote>
      <p>{authorQuotes.author}</p>
    </div>
  );
};
