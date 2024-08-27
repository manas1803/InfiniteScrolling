import React, { useCallback, useRef, useState } from "react";

import { useAuthorList } from "../hooks/useAuthorList";
import { AuthorQuotes } from "../components/AuthorQuotes";

import "./AuthorQuotesList.css"
import { ScaleLoader } from "react-spinners";
import { LOADER_CSS } from "../common/constants";

export const AuthorQuotesList = () => {
  const [limit, setLimit] = useState(10);
  const [page] = useState(1);
  const authorListState = useAuthorList(limit, page);

  const observer = useRef(null);
  const infiniteReference = useCallback(
    (element) => {
      if (authorListState?.isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && authorListState?.hasMore) {
          setLimit((prev) => prev + 10);
        }
      });

      if (element) {
        observer.current.observe(element);
      }
    },
    [authorListState?.isLoading, authorListState?.hasMore]
  );
  return (
    <div className="author-quotes-list">
      {authorListState?.authorList?.length > 0 &&
        authorListState?.authorList.map((authorQuotes, index) => {
          if (index + 1 === authorListState?.authorList.length) {
            return (
              <AuthorQuotes
                authorQuotes={authorQuotes}
                hasReference
                infiniteReference={infiniteReference}
              />
            );
          }
          return <AuthorQuotes authorQuotes={authorQuotes} />;
        })}
      {authorListState?.isLoading && <ScaleLoader color="#C8D0FF" cssOverride={LOADER_CSS}/>}
    </div>
  );
};
