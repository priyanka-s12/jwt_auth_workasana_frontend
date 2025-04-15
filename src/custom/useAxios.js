import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('userToken'));
    // console.log(token);
    const headers = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(url, headers);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return { data, loading, error, fetchData };
};

export default useAxios;
