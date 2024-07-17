import { useCallback, useRef, useState } from "react";
import { useAuthorList } from "./hooks/useAuthorList";

function App() {
  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, error, authorQuotes, hasMore] = useAuthorList(
    limit,
    pageNumber
  );

  const observer = useRef();
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
    <div className="App">
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
      {error && <div>Errors...</div>}
    </div>
  );
}

export default App;
