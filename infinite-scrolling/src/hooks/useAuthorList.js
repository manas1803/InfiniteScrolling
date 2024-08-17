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
