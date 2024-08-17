import React, { useCallback, useRef, useState } from "react";
import { useAuthorList } from "./hooks/useAuthorList";
import { AuthorQuotes } from "./components/AuthorQuotes";

const App = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [isLoading, authorList, error, hasMore] = useAuthorList(limit, page);

  const observer = useRef(null);
  const infiniteReference = useCallback(
    (element) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLimit((prev) => prev + 10);
        }
      });

      if (element) {
        observer.current.observe(element);
      }
    },
    [isLoading, hasMore]
  );

  return (
    <div className="author-quotes-list">
      {authorList.length > 0 &&
        authorList.map((authorQuotes, index) => {
          if (index + 1 === authorList.length) {
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
      {isLoading && <>Loading...</>}
    </div>
  );
};

export default App;
