## Infinite Scrolling
We can implement infinite scrolling using the `IntersectionObserver` API given by browser.
To implement we can simply follow these steps :-
1. We can use a mock API for our infinite scrolling and then create a custom hook
2. This custom hook with take the parameters of the API as its own parameter of function.
3. Then we can implement simply the API call, using useEffect and axios, passing in the parameters from the functional parameters.
4. We can have loading, error, hasMore and data as state
5. We can then also use setTimeout so that we can properly check for loading as well as infinte scrolling
6. hasMore will be equivalent to the length of array of data we are showing currently in page compared with what we get from api call
7. This hasmore is there to avoid calls even when we reached end of our data.
8. Once the custom hook is present in our main page we will create state of the parameters that we were passing
9. Then we will pass the parameters to our custom hooks and reterieve the data
10. The list of data that we get we will render it using `map` and then display it
11. Now we need to apply infinte scroll once we reach end so for the last element data of the array we receive we will simply add a ref 
12. This ref will be equivalent to a useCallback function, whose parameter will be this last element.
13. Next we will create a useRef whose value will be by default null
14. Now we will check if we are in loading state or not. If yes we will simply return
15. Next we will check if this useRef current value is null or not. If not null we will simply disconnect this observer. The idea here being that the observer should be new each time,since each time we will have new data
16. Now we will assign this new observer.current value of callback function by new IntersectionObserver.The IntersectionObserver API will return a callback function, with entries as parameter.
17. These entries are basically the value of our last element when it is in the page.We want the condition when we will interact with these entries in page
18. So we have a boolean value for each entries. isIntersecting
19. When this is true we will make the parameters of the custom hook to change. This will inturn call the api again and render also again
20. Lastly we need to observe the element we have passed in callback, so if we have the element we will simply observe it.

### Code

`CustomHook.jsx`

```jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../common/constants";

export const useAuthorList = (limit, page) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authorList, setAuthorList] = useState([]);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      axios({
        method: "GET",
        url: API_URL,
        params: { limit: limit, page: page },
      })
        .then((res) => {
          setAuthorList(res.data.data);
          setHasMore(res.data.data.length === limit);
          setIsLoading(false);
        })
        .catch((e) => setError(e));
    }, 500);
  }, [limit, page]);

  return [isLoading, authorList, error, hasMore];
};

```

`App.jsx`

```jsx
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

```

`contants.js`

```js
export const API_URL = "https://api.javascripttutorial.net/v1/quotes/"
```