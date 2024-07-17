import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../common/constants";

const useAuthorList = (authorListLimit, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [authorQuotes, setAuthorQuotes] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios({
        method: "GET",
        url: API_URL,
        params: { page: pageNumber, limit: authorListLimit },
      })
        .then((res) => {
          setAuthorQuotes(res.data.data);
          setHasMore(res.data.data.length > 0);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
        });
    }, 1000);
  }, [authorListLimit, pageNumber]);

  return [loading, error, hasMore, authorQuotes];
};

export default useAuthorList;
