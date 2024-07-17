import { useCallback, useRef, useState } from "react";
import useAuthorList from "./hooks/useAuthorList";

const App = () => {
  const [limit, setLimit] = useState(10);
  const [page] = useState(1);
  const [loading, error, hasMore, authorQuotes] = useAuthorList(limit, page);

  const observer = useRef(null);

  const lastElementRef = useCallback(
    (element) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLimit((prevLimit) => prevLimit + 10);
        }
      });

      if (element) observer.current.observe(element);
    },
    [loading, hasMore]
  );

  return (
    <>
      {authorQuotes.map((authorQuote, index) => {
        if (authorQuotes.length === index + 1) {
          return (
            <div key={authorQuote.id} ref={lastElementRef}>
              <blockquote>{authorQuote.quote}</blockquote>
              <footer>{authorQuote.author}</footer>
            </div>
          );
        }
        return (
          <div key={authorQuote.id}>
            <blockquote>{authorQuote.quote}</blockquote>
            <footer>{authorQuote.author}</footer>
          </div>
        );
      })}
      {loading && <div>Loading...</div>}
      {error && <div>Error...</div>}
    </>
  );
};

export default App;
