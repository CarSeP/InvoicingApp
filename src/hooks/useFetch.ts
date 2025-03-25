import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export enum State {
  Loading = "LOADING",
  Error = "ERROR",
  Finish = "FINISH",
}

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [state, setState] = useState(State.Loading);
  const authToken = getCookie("auth");

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: authToken?.toString() || "",
        },
      });
      setData(response.data);
      setState(State.Finish);
    } catch (error) {
      setState(State.Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, state };
};
