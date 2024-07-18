import React, { useCallback, useRef, useState } from "react";
import { useAuthorList } from "./hooks/useAuthorList";

const App = () => {
  const [limit, setLimit] = useState(10);
  const [pageNumber] = useState(1);

  const [loading, error, authorList, hasMore] = useAuthorList(
    limit,
    pageNumber
  );

  const observer = useRef(null)
  
  const lastElementRef = useCallback((element)=>{
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore){
        setLimit(prev=>prev+10)
      }
    })

    if(element) observer.current.observe(element)
    
  },[loading,hasMore])

  return (
    <>
      {authorList.map((authors,index) => {
        if(authorList.length===index+1){
          return (
            <div key={authors.id} ref={lastElementRef}>
              <blockquote>{authors.quote}</blockquote>
              <footer>{authors.author}</footer>
              <hr />
            </div>
          );
        }
        return (
          <div key={authors.id}>
            <blockquote>{authors.quote}</blockquote>
            <footer>{authors.author}</footer>
            <hr />
          </div>
        );
      })}
      {loading && <div>Loading...</div>}
      {error && <div>Error...</div>}
    </>
  );
};

export default App;
