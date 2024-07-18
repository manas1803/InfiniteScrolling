import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../common/constants";

export const useAuthorList = (listLimit, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [authorList, setAuthorList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      axios({
        method: "GET",
        url: API_URL,
        params: { page: pageNumber, limit: listLimit },
      })
        .then((res) => {
          setAuthorList(res.data.data);
          setLoading(false)
          setHasMore(res.data.data.length===listLimit)
        })
        .catch(() => setError(true));
    }, 1000);
  }, [listLimit, pageNumber]);

  return [loading,error,authorList,hasMore]
};
