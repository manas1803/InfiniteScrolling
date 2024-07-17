import axios from "axios";
import { useEffect, useState } from "react";

export const useAuthorList = (limit, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios({
        method: "GET",
        url: "https://api.javascripttutorial.net/v1/quotes/",
        params: { page: pageNumber, limit: limit },
      })
        .then((res) => {
          setAuthorQuotes(res.data.data);
          setLoading(false);
          setHasMore(res.data.data.length > 0);
        })
        .catch((e) => setError(true));
    }, 2000);
  }, [limit,pageNumber]);

  return [loading, error, authorQuotes, hasMore];
};
