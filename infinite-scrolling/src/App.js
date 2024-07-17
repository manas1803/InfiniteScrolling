import { useState } from "react";
import { useAuthorList } from "./hooks/useAuthorList";

function App() {
  const [limit,setLimit] = useState(10)
  const [pageNumber,setPageNumber] = useState(1)
  const [loading, error, authorQuotes, hasMore] = useAuthorList(limit, pageNumber);

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      {error && <div>Errors...</div>}
      {authorQuotes.map((authorQuote) => {
        return (
          <div key={authorQuote.id}>
            <blockquote>{authorQuote.quote}</blockquote>
            <footer>{authorQuote.author}</footer>
          </div>
        );
      })}
    </div>
  );
}

export default App;
